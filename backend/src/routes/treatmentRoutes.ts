import { Router } from 'express'
import { handleInputErrors, validatePatientForm, validatePatientIdType, validateTreatmentBaseForm } from '../middlewares/validations'
import { TreatmentBaseController } from '../controllers/TreatmentBaseController'

const router = Router({ mergeParams: true })

router.post('/',
    validateTreatmentBaseForm,
    handleInputErrors,
    TreatmentBaseController.createTreatmentBase
)

export default router