import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 znaków, 1 liczba, 1 duża, 1 mała

export const addNoteSchema = yup.object().shape({
    tacticName: yup.string()
        .required('Pole wymagane')
        .min(5, 'Nazwa musi mieć co najmniej 5 znaków')
        .max(50, 'Nazwa nie może przekraczać 50 znaków'),
    strategyDescription: yup.string()
        .required('Pole wymagane')
        .min(10, 'Opis musi mieć co najmniej 10 znaków'),
    effectiveness: yup.number()
        .required('Pole wymagane')
        .oneOf([1, 2, 3, 4, 5], 'Wybierz skuteczność od 1 do 5'),
    usageConditions: yup.string()
        .min(10, 'Warunki użycia muszą mieć co najmniej 10 znaków'),
    trainingDate: yup.date()
        .required('Pole wymagane'),
    opponents: yup.array()
        .of( yup.string())
        .required('Wybierz co najmniej jednego przeciwnika'),
});
