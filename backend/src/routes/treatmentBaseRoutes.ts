import { Router } from 'express'
import { PatientController } from '../controllers/PatientController'
import { handleInputErrors, validateTreatmentBaseForm, validateTreatmentBaseIdType } from '../middlewares/validations'
import { patientAlreadyExist, patientExist } from '../middlewares/patients'
import TreatmentBase from '../models/TreatmentBase'
import { TreatmentBaseController } from '../controllers/TreatmentBaseController'
import { treatmentBaseExist } from '../middlewares/treatmentBase'

const router = Router()

router.param('treatmentBaseId',validateTreatmentBaseIdType) 
router.param('treatmentBaseId',handleInputErrors)
router.param('treatmentBaseId',treatmentBaseExist)

// Crear tratamiento base
router.post('/', 
    validateTreatmentBaseForm,
    handleInputErrors,
    TreatmentBaseController.createTreatmentBase
)

// Obtener tratamiento base
router.get('/', 
    TreatmentBaseController.getAllTreatmentBase
)

// Obtener paciente por ID
router.get('/:treatmentBaseId', 
    TreatmentBaseController.getTreatmentBaseById
)

// Actualizar paciente
router.put('/:treatmentBaseId',
    validateTreatmentBaseForm,
    handleInputErrors,
    TreatmentBaseController.updateTreatmentBase
)

// Eliminar paciente
router.delete('/:treatmentBaseId', 
    TreatmentBaseController.deleteTreatmentBase
)



export default router