import { Router } from 'express'
import { handleInputErrors, validateTreatmentForm } from '../middlewares/validations'
import { TreatmentController } from '../controllers/TreatmentController'
import { patientExist } from '../middlewares/patients'
import { serviceExist } from '../middlewares/service'

const router = Router({ mergeParams: true })

router.post('/',
    validateTreatmentForm,
    handleInputErrors,
    patientExist,
    serviceExist,
    TreatmentController.createTreatment
)

export default router