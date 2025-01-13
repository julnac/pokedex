import { ErrorMessage, Field, Form, Formik } from "formik";
import { addNoteSchema } from "@/app/schemas";
import './styles/NoteForm.css'; // Import CSS file

export default function NoteForm({ setIsOpen, initialValues, confirmButtonText }) {
    const pokemonTypes = [
        'Fire', 'Water', 'Grass', 'Electric', 'Rock', 'Ground',
        'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy',
    ];

    const handleSubmit = (values) => {
        const currentNotes = JSON.parse(localStorage.getItem('notes')) || [];
        currentNotes.push(values);
        localStorage.setItem('notes', JSON.stringify(currentNotes));
        setIsOpen(false);
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={addNoteSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <Field
                            type="text"
                            id="tacticName"
                            name="tacticName"
                            placeholder="Tactic Name"
                            className="form-field" // Use custom CSS class
                        />
                        <ErrorMessage name="tacticName" component="div" className="error-message" />

                        <Field
                            type="text"
                            id="strategyDescription"
                            name="strategyDescription"
                            placeholder="Description"
                            className="form-field"
                        />
                        <ErrorMessage name="strategyDescription" component="div" className="error-message" />

                        <div>
                            <div>
                                <label htmlFor="effectiveness" className="label">Effectiveness</label>
                                <Field
                                    as="select"
                                    name="effectiveness"
                                    className="select-effectiveness"
                                >
                                    <option value="" label="Wybierz skuteczność" />
                                    <option value="1" label="1 - Bardzo słaba" />
                                    <option value="2" label="2 - Słaba" />
                                    <option value="3" label="3 - Średnia" />
                                    <option value="4" label="4 - Dobra" />
                                    <option value="5" label="5 - Doskonała" />
                                </Field>
                                <ErrorMessage name="effectiveness" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="usageConditions" className="label">Usage conditions</label>
                                <Field
                                    type="text"
                                    id="usageConditions"
                                    name="usageConditions"
                                    placeholder="Usage conditions"
                                    className="form-field"
                                />
                                <ErrorMessage name="usageConditions" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="trainingDate" className="label">Training date</label>
                                <Field
                                    type="date"
                                    id="trainingDate"
                                    name="trainingDate"
                                    className="form-field"
                                />
                                <ErrorMessage name="trainingDate" component="div" className="error-message" />
                            </div>
                            <div>
                                <label className="label">Opponents</label>
                                {pokemonTypes.map((type) => (
                                    <div key={type} className="flex items-center">
                                        <Field
                                            type="checkbox"
                                            id={type}
                                            name="opponents"
                                            value={type}
                                        />
                                        <label htmlFor={type} className="checkbox-label">{type}</label>
                                    </div>
                                ))}
                                <ErrorMessage name="opponents" component="div" className="error-message" />
                            </div>
                        </div>

                        <div className="flex-container">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="button button-cancel"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="button button-submit"
                            >
                                {confirmButtonText}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
