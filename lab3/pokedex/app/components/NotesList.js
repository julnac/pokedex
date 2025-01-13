'use client';
import { useEffect, useState } from "react";
import NoteForm from "@/app/components/forms/NoteForm";
import EditNoteForm from "@/app/components/forms/EditNoteForm";
import "./NotesList.css";

export default function NotesList(pokemonId) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(null);
    const [notes, setNotes] = useState([]);
    const {id: currentPokemonId} = pokemonId;
    // console.warn("PkemonId:", currentPokemonId);

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        console.log("Loaded notes:", storedNotes); // Debug
        setNotes(storedNotes);
    }, []);


    const handleDelete = (id) => {
        const notesWithoutDeleted = notes.filter((note) => note.id !== id);
        localStorage.setItem("notes", JSON.stringify(notesWithoutDeleted));
        setNotes(notesWithoutDeleted);
    };

    const filteredNotes = notes
        .filter((note) => note.pokemonId === currentPokemonId)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    // const filteredNotes = notes
    //     .filter((note) => {
    //         const notePokemonId = Number(note.pokemonId);
    //
    //         console.log(`Filtering note: notePokemonId=${notePokemonId}, currentPokemonId=${currentPokemonId}`);
    //         return notePokemonId === currentPokemonId;
    //     })
    //     .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));


    console.log("Filtered notes:", filteredNotes); //debug

    return (
        <div className="notes-container">
            <h1 className="notes-title">Notes List</h1>
            <ul className="notes-list">
                {filteredNotes.map((note) => (
                    <li key={note.id} className="note-item">
                        <div className="note-details">
                            <div><strong>Name:</strong> {note.tacticName}</div>
                            <div><strong>Description:</strong> {note.strategyDescription}</div>
                            <div><strong>Effectiveness:</strong> {note.effectiveness}</div>
                            <div><strong>Conditions:</strong> {note.usageConditions}</div>
                            <div><strong>Date:</strong> {note.trainingDate}</div>
                            <div><strong>Opponents:</strong> {note.opponents.join(", ")}</div>
                        </div>
                        <div className="note-actions">
                            <button className="button edit-button" onClick={() => setIsEditOpen(note.id)}>
                                Edit
                            </button>
                            <button className="button delete-button" onClick={() => handleDelete(note.id)}>
                                Delete
                            </button>
                        </div>
                        {isEditOpen === note.id && (
                            <EditNoteForm
                                setIsOpen={setIsEditOpen}
                                noteId={note.id}
                                setNotes={setNotes}
                            />
                        )}
                    </li>
                ))}
            </ul>
            {isAddOpen &&
                <NoteForm
                    setIsOpen={setIsAddOpen}
                    setNotes={setNotes}
                    pokemonId={pokemonId}
                />
            }
            {!isAddOpen && (
                <button
                    className="button add-button"
                    onClick={() => setIsAddOpen(true)}
                >
                    Add Note
                </button>
            )}
        </div>
    );
}
