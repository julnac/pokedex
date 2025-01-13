import './NoteForm.css';
import {useEffect, useState} from "react";

export default function EditNoteForm({ setIsOpen, noteId, setNotes }) {
    const [formData, setFormData] = useState({
        id: '',
        pokemonId: '',
        tacticName: '',
        strategyDescription: '',
        effectiveness: '',
        usageConditions: '',
        trainingDate: '',
        opponents: [],
        createdAt: '',
        updatedAt: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        const existingNote = storedNotes.find(note => note.id === noteId);
        if (existingNote) {
            setFormData(existingNote);
        }
    }, [noteId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => {
                const newOpponents = checked
                    ? [...prev.opponents, value]
                    : prev.opponents.filter(opponent => opponent !== value);
                return { ...prev, opponents: newOpponents };
            });
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.tacticName || formData.tacticName.length < 5 || formData.tacticName.length > 50) {
            newErrors.tacticName = 'Tactic name is required and should be between 5 and 50 characters.';
        }
        if (!formData.strategyDescription || formData.strategyDescription.length < 10) {
            newErrors.strategyDescription = 'Description is required and must be at least 10 characters.';
        }
        if (!formData.effectiveness) {
            newErrors.effectiveness = 'Effectiveness is required.';
        }
        if (!formData.usageConditions || formData.usageConditions.length < 10) {
            newErrors.usageConditions = 'Usage conditions are required and must be at least 10 characters.';
        }
        if (!formData.trainingDate) {
            newErrors.trainingDate = 'Training date is required.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
            const updatedNotes = storedNotes.map(note =>
                note.id === noteId
                    ? {
                        ...formData,
                        updatedAt: new Date().toISOString(),
                    } : note
            );
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            setNotes(updatedNotes);
            setIsOpen(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div  className="container">
                    <input
                        type="text"
                        id="tacticName"
                        name="tacticName"
                        placeholder="Tactic Name"
                        value={formData.tacticName}
                        onChange={handleChange}
                        className="form-field"
                    />
                    {errors.tacticName && <div className="error-message">{errors.tacticName}</div>}
                </div>

                <div>
                    <input
                        type="text"
                        id="strategyDescription"
                        name="strategyDescription"
                        placeholder="Description"
                        value={formData.strategyDescription}
                        onChange={handleChange}
                        className="form-field"
                    />
                    {errors.strategyDescription && <div className="error-message">{errors.strategyDescription}</div>}
                </div>

                <div>
                    <label htmlFor="effectiveness">Effectiveness</label>
                    <select
                        name="effectiveness"
                        value={formData.effectiveness}
                        onChange={handleChange}
                        className="select-effectiveness"
                    >
                        <option value="">Wybierz skuteczność</option>
                        <option value="1">1 - Bardzo słaba</option>
                        <option value="2">2 - Słaba</option>
                        <option value="3">3 - Średnia</option>
                        <option value="4">4 - Dobra</option>
                        <option value="5">5 - Doskonała</option>
                    </select>
                    {errors.effectiveness && <div className="error-message">{errors.effectiveness}</div>}
                </div>

                <div>
                    <input
                        type="text"
                        id="usageConditions"
                        name="usageConditions"
                        placeholder="Usage conditions"
                        value={formData.usageConditions}
                        onChange={handleChange}
                        className="form-field"
                    />
                    {errors.usageConditions && <div className="error-message">{errors.usageConditions}</div>}
                </div>

                <div>
                    <input
                        type="date"
                        id="trainingDate"
                        name="trainingDate"
                        value={formData.trainingDate}
                        onChange={handleChange}
                        className="form-field"
                    />
                    {errors.trainingDate && <div className="error-message">{errors.trainingDate}</div>}
                </div>

                <div>
                    <label>Opponents</label>
                    {['Fire', 'Water', 'Grass', 'Electric', 'Rock', 'Ground', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy'].map(type => (
                        <div key={type} className="flex items-center">
                            <input
                                type="checkbox"
                                id={type}
                                name="opponents"
                                value={type}
                                checked={formData.opponents.includes(type)}
                                onChange={handleChange}
                            />
                            <label htmlFor={type} className="checkbox-label">{type}</label>
                        </div>
                    ))}
                </div>

                <div className="flex-container">
                    <button
                        type="button"
                        onClick={() => setIsOpen(null)}
                        className="button button-cancel"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="button button-submit"
                    >
                        Edit
                    </button>
                </div>
            </form>
        </div>
    );
}