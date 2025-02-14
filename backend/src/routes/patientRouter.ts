import { Router } from 'express'
import { PatientController } from '../controllers/PatientController'
import { handleInputErrors, validatePatientForm, validatePatientIdType } from '../middlewares/validations'
import { patientAlreadyExist, patientExist } from '../middlewares/patients'

const router = Router()


// Validate projectId inputs
router.param('patientId',validatePatientIdType)
router.param('patientId',handleInputErrors)

// Validate project exist
router.param('patientId', patientExist)

// Crear paciente
router.post('/', 
    validatePatientForm,
    handleInputErrors,
    patientAlreadyExist,
    PatientController.createPatient
)

// Obtener pacientes
router.get('/', 
    PatientController.getPatients
)

// Obtener paciente por ID
router.get('/:patientId', 
    PatientController.getPatientById
)

// Actualizar paciente



export default router