import { Router } from 'express'
import { PatientController } from '../controllers/PatientController'
import { handleInputErrors, validatePatientForm, validatePatientIdType } from '../middlewares/validations'
import { patientAlreadyExist, patientExist } from '../middlewares/patients'

const router = Router()

router.param('patientId',validatePatientIdType) // Validate patientId input
router.param('patientId',handleInputErrors)
router.param('patientId', patientExist) // Validate patient exist

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
router.put('/:patientId',
    validatePatientForm,
    handleInputErrors,
    PatientController.updatePatient
)

// Eliminar paciente
router.delete('/:patientId', 
    PatientController.deletePatient
)



export default router