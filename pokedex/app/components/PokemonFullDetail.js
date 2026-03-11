'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './PokemonFullDetail.css';

const TYPE_COLORS = {
    normal: '#a8a878', fire: '#fd7d24', water: '#4592c4', electric: '#f5c731',
    grass: '#49d0b0', ice: '#98d8d8', fighting: '#c03028', poison: '#a040a0',
    ground: '#e0c068', flying: '#a890f0', psychic: '#f85888', bug: '#a8b820',
    rock: '#b8a038', ghost: '#705898', dragon: '#7038f8', dark: '#705848',
    steel: '#b8b8d0', fairy: '#ee99ac',
};

const STAT_COLORS = {
    hp: '#ff5959', attack: '#f5ac78', defense: '#fae078',
    'special-attack': '#9db7f5', 'special-defense': '#a7db8d', speed: '#fa92b2',
};

const STAT_LABELS = {
    hp: 'HP', attack: 'Attack', defense: 'Defense',
    'special-attack': 'Sp. Atk', 'special-defense': 'Sp. Def', speed: 'Speed',
};

const MAX_STAT = 255;

function extractIdFromUrl(url) {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
}

export default function PokemonFullDetail({ id }) {
    const [pokemon, setPokemon] = useState(null);
    const [species, setSpecies] = useState(null);
    const [evoChain, setEvoChain] = useState(null);
    const [abilityDescs, setAbilityDescs] = useState({});
    const [activeSprite, setActiveSprite] = useState('front_default');
    const [moveFilter, setMoveFilter] = useState('all');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        async function fetchAll() {
            try {
                const pokRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (!pokRes.ok) throw new Error('Failed to fetch Pokémon');
                const pokData = await pokRes.json();
                setPokemon(pokData);

                const specRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                if (specRes.ok) {
                    const specData = await specRes.json();
                    setSpecies(specData);

                    if (specData.evolution_chain?.url) {
                        const evoRes = await fetch(specData.evolution_chain.url);
                        if (evoRes.ok) {
                            const evoData = await evoRes.json();
                            setEvoChain(evoData);
                        }
                    }
                }

                const abilityPromises = pokData.abilities.map(async (a) => {
                    try {
                        const res = await fetch(a.ability.url);
                        const data = await res.json();
                        const entry = data.effect_entries.find(e => e.language.name === 'en');
                        return { name: a.ability.name, desc: entry?.short_effect || entry?.effect || 'No description available.' };
                    } catch {
                        return { name: a.ability.name, desc: 'No description available.' };
                    }
                });
                const abilities = await Promise.all(abilityPromises);
                const abilityMap = {};
                abilities.forEach(a => { abilityMap[a.name] = a.desc; });
                setAbilityDescs(abilityMap);

            } catch (err) {
                setError(err.message);
            }
        }

        fetchAll();
    }, [id]);

    function getFlavorText() {
        if (!species) return null;
        const entry = species.flavor_text_entries.find(e => e.language.name === 'en');
        return entry ? entry.flavor_text.replace(/[\n\f\r]/g, ' ') : null;
    }

    function getGenus() {
        if (!species) return null;
        const entry = species.genera.find(g => g.language.name === 'en');
        return entry?.genus || null;
    }

    function parseEvoChain(chain) {
        const stages = [];
        function recurse(node, trigger) {
            const specId = extractIdFromUrl(node.species.url);
            stages.push({
                name: node.species.name,
                id: specId,
                trigger: trigger,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${specId}.png`,
            });
            node.evolves_to.forEach(evo => {
                let triggerText = '';
                const detail = evo.evolution_details?.[0];
                if (detail) {
                    if (detail.min_level) triggerText = `Lv. ${detail.min_level}`;
                    else if (detail.item) triggerText = detail.item.name.replace('-', ' ');
                    else if (detail.trigger?.name === 'trade') triggerText = 'Trade';
                    else if (detail.min_happiness) triggerText = `Happiness ${detail.min_happiness}`;
                    else if (detail.trigger?.name) triggerText = detail.trigger.name.replace('-', ' ');
                }
                recurse(evo, triggerText);
            });
        }
        recurse(chain, '');
        return stages;
    }

    function getSpriteOptions() {
        if (!pokemon) return [];
        const sprites = pokemon.sprites;
        const options = [];
        if (sprites.front_default) options.push({ key: 'front_default', label: 'Front', url: sprites.front_default });
        if (sprites.back_default) options.push({ key: 'back_default', label: 'Back', url: sprites.back_default });
        if (sprites.front_shiny) options.push({ key: 'front_shiny', label: 'Shiny', url: sprites.front_shiny });
        if (sprites.back_shiny) options.push({ key: 'back_shiny', label: 'Shiny Back', url: sprites.back_shiny });
        const artwork = sprites.other?.['official-artwork']?.front_default;
        if (artwork) options.push({ key: 'artwork', label: 'Artwork', url: artwork });
        return options;
    }

    function getMovesByMethod() {
        if (!pokemon) return {};
        const grouped = {};
        pokemon.moves.forEach(m => {
            const method = m.version_group_details[m.version_group_details.length - 1]?.move_learn_method?.name || 'other';
            if (!grouped[method]) grouped[method] = [];
            grouped[method].push(m.move.name.replace(/-/g, ' '));
        });
        return grouped;
    }

    // --- Loading / Error ---
    if (error) {
        return (
            <div className="pfd-loading">
                <p style={{ color: 'var(--accent-secondary)' }}>⚠ {error}</p>
            </div>
        );
    }

    if (!pokemon) {
        return (
            <div className="pfd-loading">
                <div className="pfd-loading-spinner" />
                <span className="pfd-loading-text">Loading Pokémon data...</span>
            </div>
        );
    }

    // --- Data ---
    const types = pokemon.types.map(t => t.type.name);
    const spriteOptions = getSpriteOptions();
    const currentSprite = spriteOptions.find(s => s.key === activeSprite) || spriteOptions[0];
    const flavorText = getFlavorText();
    const genus = getGenus();
    const movesByMethod = getMovesByMethod();
    const moveMethodKeys = Object.keys(movesByMethod);
    const filteredMoves = moveFilter === 'all'
        ? Object.values(movesByMethod).flat().sort()
        : (movesByMethod[moveFilter] || []).sort();

    const evoStages = evoChain ? parseEvoChain(evoChain.chain) : [];

    const genderRate = species?.gender_rate;
    const femalePercent = genderRate !== null && genderRate !== undefined && genderRate >= 0 ? (genderRate / 8) * 100 : null;
    const malePercent = femalePercent !== null ? 100 - femalePercent : null;

    return (
        <div className="pfd-page">
            {/* ===== HERO ===== */}
            <section className="pfd-hero">
                <div className="pfd-hero-left">
                    <div className="pfd-sprite-main">
                        {currentSprite && (
                            <Image
                                src={currentSprite.url}
                                alt={pokemon.name}
                                width={currentSprite.key === 'artwork' ? 240 : 200}
                                height={currentSprite.key === 'artwork' ? 240 : 200}
                                unoptimized={currentSprite.key === 'artwork'}
                            />
                        )}
                    </div>
                    <div className="pfd-sprite-gallery">
                        {spriteOptions.map(s => (
                            <button
                                key={s.key}
                                className={`pfd-sprite-thumb ${activeSprite === s.key ? 'active' : ''}`}
                                onClick={() => setActiveSprite(s.key)}
                                title={s.label}
                            >
                                <Image src={s.url} alt={s.label} width={40} height={40} unoptimized />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pfd-hero-right">
                    <div className="pfd-header">
                        <h1 className="pfd-name">{pokemon.name}</h1>
                        <span className="pfd-id">#{String(pokemon.id).padStart(3, '0')}</span>
                    </div>

                    {genus && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{genus}</span>}

                    <div className="pfd-types">
                        {types.map(type => (
                            <span key={type} className="pfd-type-badge" style={{ backgroundColor: TYPE_COLORS[type] }}>
                                {type}
                            </span>
                        ))}
                    </div>

                    {flavorText && <p className="pfd-flavor">{flavorText}</p>}

                    <div className="pfd-quick-info">
                        <div className="pfd-info-chip">
                            <span className="pfd-info-chip-icon">📏</span>
                            <div>
                                <div className="pfd-info-chip-label">Height</div>
                                <div className="pfd-info-chip-value">{(pokemon.height / 10).toFixed(1)} m</div>
                            </div>
                        </div>
                        <div className="pfd-info-chip">
                            <span className="pfd-info-chip-icon">⚖️</span>
                            <div>
                                <div className="pfd-info-chip-label">Weight</div>
                                <div className="pfd-info-chip-value">{(pokemon.weight / 10).toFixed(1)} kg</div>
                            </div>
                        </div>
                        <div className="pfd-info-chip">
                            <span className="pfd-info-chip-icon">✨</span>
                            <div>
                                <div className="pfd-info-chip-label">Base Exp</div>
                                <div className="pfd-info-chip-value">{pokemon.base_experience ?? '—'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== TWO COLUMN: Stats + Abilities ===== */}
            <div className="pfd-two-col">
                {/* Base Stats */}
                <section className="pfd-section">
                    <h2 className="pfd-section-title">
                        Base Stats
                    </h2>
                    <div className="pfd-stats-grid">
                        {pokemon.stats.map(stat => {
                            const pct = Math.min((stat.base_stat / MAX_STAT) * 100, 100);
                            const color = STAT_COLORS[stat.stat.name] || '#888';
                            return (
                                <div key={stat.stat.name} className="pfd-stat-row">
                                    <span className="pfd-stat-name">{STAT_LABELS[stat.stat.name] || stat.stat.name}</span>
                                    <span className="pfd-stat-value">{stat.base_stat}</span>
                                    <div className="pfd-stat-bar-bg">
                                        <div
                                            className="pfd-stat-bar-fill"
                                            style={{ width: `${pct}%`, backgroundColor: color }}
                                        />
                                    </div>
                                    <span className="pfd-stat-max">{MAX_STAT}</span>
                                </div>
                            );
                        })}
                        <div className="pfd-stat-total">
                            <span className="pfd-stat-total-label">Total</span>
                            <span className="pfd-stat-total-value">
                                {pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0)}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Abilities */}
                <section className="pfd-section">


                    {/* Species Info below abilities */}
                    {species && (
                        <>
                            <h2 className="pfd-section-title">
                                Species Info
                            </h2>
                            <div className="pfd-species-grid">
                                {species.generation && (
                                    <div className="pfd-species-item">
                                        <div className="pfd-species-label">Generation</div>
                                        <div className="pfd-species-value">
                                            {species.generation.name.replace('generation-', '').toUpperCase()}
                                        </div>
                                    </div>
                                )}
                                {species.habitat && (
                                    <div className="pfd-species-item">
                                        <div className="pfd-species-label">Habitat</div>
                                        <div className="pfd-species-value">{species.habitat.name}</div>
                                    </div>
                                )}
                                {species.shape && (
                                    <div className="pfd-species-item">
                                        <div className="pfd-species-label">Shape</div>
                                        <div className="pfd-species-value">{species.shape.name}</div>
                                    </div>
                                )}
                                <div className="pfd-species-item">
                                    <div className="pfd-species-label">Capture Rate</div>
                                    <div className="pfd-species-value">{species.capture_rate}</div>
                                </div>
                                <div className="pfd-species-item">
                                    <div className="pfd-species-label">Base Happiness</div>
                                    <div className="pfd-species-value">{species.base_happiness ?? '—'}</div>
                                </div>
                                {species.growth_rate && (
                                    <div className="pfd-species-item">
                                        <div className="pfd-species-label">Growth Rate</div>
                                        <div className="pfd-species-value">
                                            {species.growth_rate.name.replace(/-/g, ' ')}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Gender ratio */}
                            {femalePercent !== null && genderRate >= 0 && (
                                <div style={{ marginTop: '1rem' }}>
                                    <div className="pfd-species-label" style={{ marginBottom: '6px' }}>Gender Ratio</div>
                                    <div className="pfd-gender-bar-container">
                                        <div className="pfd-gender-bar">
                                            <div className="pfd-gender-male" style={{ width: `${malePercent}%` }} />
                                            <div className="pfd-gender-female" style={{ width: `${femalePercent}%` }} />
                                        </div>
                                        <div className="pfd-gender-labels">
                                            <span>♂ {malePercent.toFixed(1)}%</span>
                                            <span>♀ {femalePercent.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {genderRate === -1 && (
                                <div style={{ marginTop: '0.75rem' }}>
                                    <div className="pfd-species-label">Gender</div>
                                    <div className="pfd-species-value">Genderless</div>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>

            {/* ===== EVOLUTION CHAIN ===== */}
            {evoStages.length > 1 && (
                <section className="pfd-section">
                    <h2 className="pfd-section-title">
                        <span className="pfd-section-title-icon">🔄</span> Evolution Chain
                    </h2>
                    <div className="pfd-evo-chain">
                        {evoStages.map((stage, i) => (
                            <div key={stage.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {i > 0 && (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span className="pfd-evo-arrow">→</span>
                                        {stage.trigger && (
                                            <span className="pfd-evo-trigger">{stage.trigger}</span>
                                        )}
                                    </div>
                                )}
                                <Link
                                    href={`/pokemon/${stage.id}`}
                                    className={`pfd-evo-stage ${String(stage.id) === String(id) ? 'current' : ''}`}
                                >
                                    <div className="pfd-evo-sprite">
                                        <Image
                                            src={stage.sprite}
                                            alt={stage.name}
                                            width={60}
                                            height={60}
                                            unoptimized
                                        />
                                    </div>
                                    <span className="pfd-evo-name">{stage.name}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ===== MOVES ===== */}
            <section className="pfd-section">
                <h2 className="pfd-section-title">
                    <span className="pfd-section-title-icon">⚔️</span> Moves
                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                        {filteredMoves.length} moves
                    </span>
                </h2>
                <div className="pfd-moves-controls">
                    <button
                        className={`pfd-moves-tab ${moveFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setMoveFilter('all')}
                    >
                        All
                    </button>
                    {moveMethodKeys.map(method => (
                        <button
                            key={method}
                            className={`pfd-moves-tab ${moveFilter === method ? 'active' : ''}`}
                            onClick={() => setMoveFilter(method)}
                        >
                            {method.replace(/-/g, ' ')}
                        </button>
                    ))}
                </div>
                <div className="pfd-moves-grid">
                    {filteredMoves.map(move => (
                        <div key={move} className="pfd-move-chip">
                            {move}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
