import type { Request, Response, NextFunction} from 'express'
import { body, param, ValidationChain, validationResult } from 'express-validator'
import { validateRut } from '../utils'
import moment from 'moment-timezone'

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
    .isMongoId().withMessage('ID no válido')

export const validateServiceIdType = param('serviceId')
    .isMongoId().withMessage('ID no válido')

export const validateTreatmentIdType = param('treatmentId')
    .isMongoId().withMessage('ID no válido')

export const validateAppointmentIdType = param('appointmentId')
    .isMongoId().withMessage('ID no válido')

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

export const validateServiceForm: ValidationChain[] = [
    body('name').trim()
        .notEmpty().withMessage('Nombre del tratamiento requerido'),
    body('basePrice')
        .isNumeric().withMessage('Precio debe ser un número')
        .isInt({ gt: 0 }).withMessage("El precio debe ser mayor a cero"),
    body('baseSessions')
        .isNumeric().withMessage('Número de sesiones debe ser un numero')
        .isInt({ gt: 0 }).withMessage("El numero de sesiones debe ser mayor a cero"),
    body('sessionDuration')
        .isArray().withMessage('El formato de la duracion de sesiones no es válido')
        .custom((value, { req }) => {
            if (value.length !== req.body.baseSessions) {
                throw new Error("La cantidad de duraciones debe coincidir con el número de sesiones");
            }
            return true;
        }),
    body("sessionDuration.*")
        .isInt({ gt: 0 }).withMessage("Cada sesión debe tener una duración mayor a cero"),
    
]

export const validateTreatmentForm: ValidationChain[] = [
    body('serviceId')
        .isMongoId().withMessage('ID del tratamiento no válido'),
    body('finalPrice').optional()
        .isNumeric().withMessage('Precio debe ser un número')
        .isInt({ gt: 0 }).withMessage("El precio debe ser mayor a cero"),
    body('finalSessions').optional()
        .isNumeric().withMessage('Numero de sesiones debe ser un número')
        .isInt({ gt: 0 }).withMessage("Numero de sesiones debe ser mayor a cero"),
    body('sessionDuration').optional()
        .isNumeric().withMessage('Numero de sesiones debe ser un número')
        .isInt({ gt: 0 }).withMessage("Numero de sesiones debe ser mayor a cero"),
    body('discount').optional()
        .isNumeric().withMessage('Descuento debe ser un número')
        .isInt({ gt: 0 }).withMessage("Descuento debe ser mayor a cero"),
]

export const validateAppointmentForm: ValidationChain[] = [
    body('date')
        .isISO8601().withMessage("La fecha y hora deben estar en formato ISO8601 (YYYY-MM-DDTHH:mm:ss.sssZ)")
        .custom((value) => {

            const fechaEnChile = moment.tz(value, "America/Santiago")
            const fechaActual = moment().tz("America/Santiago");
            const hora = fechaEnChile.hours();
            
            if (fechaEnChile.isBefore(fechaActual, "minute")) {
                throw new Error("La fecha y hora no pueden anterior a ahora");
            }

            if (hora < 8 || hora > 22) {
                throw new Error("La hora debe estar entre las 08:00 y las 22:00");
            }

            return true;
        }),
    body("status")
        .isIn(["Pendiente", "Confirmada", "Completada", "Cancelada"])
        .withMessage("El estado debe ser 'Pendiente', 'Confirmada', 'Completada' o 'Cancelada'")
]