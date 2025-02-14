import { Router } from 'express'
import { handleInputErrors, validateServiceForm, validateServiceIdType } from '../middlewares/validations'
import Service from '../models/Service'
import { ServiceController } from '../controllers/ServiceController'
import { serviceExist } from '../middlewares/service'

const router = Router()

router.param('serviceId',validateServiceIdType) 
router.param('serviceId',handleInputErrors)
router.param('serviceId',serviceExist)

// Crear tratamiento base
router.post('/', 
    validateServiceForm,
    handleInputErrors,
    ServiceController.createService
)

// Obtener tratamiento base
router.get('/', 
    ServiceController.getAllServices
)

// Obtener paciente por ID
router.get('/:serviceId', 
    ServiceController.getServiceById
)

// Actualizar paciente
router.put('/:serviceId',
    validateServiceForm,
    handleInputErrors,
    ServiceController.updateService
)

// Eliminar paciente
router.delete('/:serviceId', 
    ServiceController.deleteService
)

export default router