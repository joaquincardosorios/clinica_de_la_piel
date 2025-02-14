import { Router } from 'express'
import { handleInputErrors, validateTreatmentBaseForm, validateTreatmentBaseIdType } from '../middlewares/validations'
import Service from '../models/Service'
import { ServiceController } from '../controllers/ServiceController'
import { serviceExist } from '../middlewares/service'

const router = Router()

router.param('treatmentBaseId',validateTreatmentBaseIdType) 
router.param('treatmentBaseId',handleInputErrors)
router.param('treatmentBaseId',serviceExist)

// Crear tratamiento base
router.post('/', 
    validateTreatmentBaseForm,
    handleInputErrors,
    ServiceController.createService
)

// Obtener tratamiento base
router.get('/', 
    ServiceController.getAllServices
)

// Obtener paciente por ID
router.get('/:treatmentBaseId', 
    ServiceController.getServiceById
)

// Actualizar paciente
router.put('/:treatmentBaseId',
    validateTreatmentBaseForm,
    handleInputErrors,
    ServiceController.updateService
)

// Eliminar paciente
router.delete('/:treatmentBaseId', 
    ServiceController.deleteService
)



export default router