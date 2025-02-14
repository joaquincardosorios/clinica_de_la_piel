import type { Request, Response, NextFunction} from 'express'
import { body, param, ValidationChain, validationResult } from 'express-validator'
import { validateRut } from '../utils'
import moment from 'moment'

export const handleInputErrors = (req : Request, res: Response, next : NextFunction) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array()})
        return
    }
    next()
}

const capitalize = (value: string) => {
    return value
        .toLowerCase() // Convierte todo a minúsculas primero
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza la primera letra de cada palabra
};

export const validatePatientIdType = param('patientId')
    .isMongoId().withMessage('ID no válido');

export const validatePatientForm: ValidationChain[] = [
    body('rut').trim()
        .notEmpty().withMessage('El RUT es requerido')
        .custom((value) => {
            if (!validateRut(value)) {
                throw new Error('RUT no válido. Formato esperado: 12345678-9');
            }
            return true;
        }),
    body('names').trim()
        .notEmpty().withMessage('Los nombres son requeridos'),
    body('last_names').trim()
        .notEmpty().withMessage('Los apellidos son requeridos'),
    body('dob')
        .isISO8601().withMessage('Formato de fecha inválido. Use YYYY-MM-DD')
        .custom((value) => {
            const birthDate = moment(value, 'YYYY-MM-DD', true);
            if (!birthDate.isValid()) {
                throw new Error('Fecha de nacimiento no válida');
            }
            const age = moment().diff(birthDate, 'years');
            if (age < 0) {
                throw new Error('Fecha de nacimiento no puede ser mayor a la fecha actual');
            }
            return true;
        }),
    body('address').trim()
        .notEmpty().withMessage('La dirección es requerida'),
    body('city').trim()
        .notEmpty().withMessage('La ciudad es requerida'),
    body('prevision').trim().customSanitizer(capitalize)
        .notEmpty().withMessage('La previsión es requerida'),
    body('phone')
        .matches(/^\d{9}$/)
        .withMessage('El número de teléfono debe contener exactamente 9 dígitos numéricos'),
    body('email')
        .optional()
        .isEmail().withMessage('El formato del correo electrónico no es válido')

]