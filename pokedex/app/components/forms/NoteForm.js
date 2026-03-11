import { ErrorMessage, Field, Form, Formik } from "formik";
import { addNoteSchema } from "@/app/schemas";
import './NoteForm.css';
import { v4 as uuidv4 } from 'uuid';

export default function NoteForm({ setIsOpen, setNotes, pokemonId }) {
    const pokemonTypes = [
        'Fire', 'Water', 'Grass', 'Electric', 'Rock', 'Ground',
        'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy',
    ];

    const handleSubmit = (values) => {
        const uniqueId = uuidv4();
        const newNote = {
            id: uniqueId,
            pokemonId: pokemonId.id,
            ...values,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(newNote);

        localStorage.setItem('notes', JSON.stringify(existingNotes));
        setNotes(existingNotes);
        setIsOpen(false);
    }

    return (
        <div className="nf-wrapper">
            <Formik
                initialValues={
                    {
                        tacticName: '',
                        strategyDescription: '',
                        effectiveness: '',
                        usageConditions: '',
                        trainingDate: '',
                        opponents: []
                    }
                }
                validationSchema={addNoteSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="nf-form">
                        <div className="nf-header">
                            <h3 className="nf-title">Add Note</h3>
                        </div>

                        <div className="nf-field-group">
                            <label className="nf-label" htmlFor="tacticName">Tactic Name</label>
                            <Field
                                type="text"
                                id="tacticName"
                                name="tacticName"
                                placeholder="Enter tactic name"
                                className="nf-input"
                            />
                            <ErrorMessage name="tacticName" component="div" className="nf-error-message" />
                        </div>

                        <div className="nf-field-group">
                            <label className="nf-label" htmlFor="strategyDescription">Description</label>
                            <Field
                                as="textarea"
                                id="strategyDescription"
                                name="strategyDescription"
                                placeholder="Describe your strategy..."
                                className="nf-input nf-textarea"
                            />
                            <ErrorMessage name="strategyDescription" component="div" className="nf-error-message" />
                        </div>

                        <div className="nf-grid">
                            <div className="nf-field-group">
                                <label htmlFor="effectiveness" className="nf-label">Effectiveness</label>
                                <Field
                                    as="select"
                                    name="effectiveness"
                                    id="effectiveness"
                                    className="nf-select"
                                >
                                    <option value="" label="Select effectiveness" />
                                    <option value="1" label="1 - Very Weak" />
                                    <option value="2" label="2 - Weak" />
                                    <option value="3" label="3 - Average" />
                                    <option value="4" label="4 - Good" />
                                    <option value="5" label="5 - Excellent" />
                                </Field>
                                <ErrorMessage name="effectiveness" component="div" className="nf-error-message" />
                            </div>

                            <div className="nf-field-group">
                                <label htmlFor="trainingDate" className="nf-label">Training Date</label>
                                <Field
                                    type="date"
                                    id="trainingDate"
                                    name="trainingDate"
                                    className="nf-input"
                                />
                                <ErrorMessage name="trainingDate" component="div" className="nf-error-message" />
                            </div>

                            <div className="nf-field-group nf-col-span-2">
                                <label htmlFor="usageConditions" className="nf-label">Usage Conditions</label>
                                <Field
                                    type="text"
                                    id="usageConditions"
                                    name="usageConditions"
                                    placeholder="When should this be used?"
                                    className="nf-input"
                                />
                                <ErrorMessage name="usageConditions" component="div" className="nf-error-message" />
                            </div>

                            <div className="nf-field-group nf-col-span-2">
                                <label className="nf-label">Opponents</label>
                                <div className="nf-checkbox-grid">
                                    {pokemonTypes.map((type) => (
                                        <label key={type} className="nf-checkbox-item">
                                            <Field
                                                type="checkbox"
                                                id={type}
                                                name="opponents"
                                                value={type}
                                                className="nf-checkbox-input"
                                            />
                                            <span className="nf-checkbox-custom"></span>
                                            <span className="nf-checkbox-label">{type}</span>
                                        </label>
                                    ))}
                                </div>
                                <ErrorMessage name="opponents" component="div" className="nf-error-message" />
                            </div>
                        </div>

                        <div className="nf-actions">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="nf-btn nf-btn-cancel"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="nf-btn nf-btn-submit"
                            >
                                Save Note
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
