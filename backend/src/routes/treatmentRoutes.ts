import { Router } from 'express'
import { handleInputErrors, validateTreatmentForm, validateTreatmentIdType } from '../middlewares/validations'
import { TreatmentController } from '../controllers/TreatmentController'
import { serviceExist } from '../middlewares/service'
import { treatmentExist } from '../middlewares/treatment'

const router = Router({ mergeParams: true })

router.param('treatmentId',validateTreatmentIdType)
router.param('treatmentId',handleInputErrors)
router.param('treatmentId', treatmentExist) 

router.post('/',
    validateTreatmentForm,
    handleInputErrors,
    serviceExist,
    TreatmentController.createTreatment
)

router.get('/',
    TreatmentController.getAllTreatment
)

router.get('/:treatmentId',
    TreatmentController.getTreatmentById
)

router.delete('/:treatmentId',
    TreatmentController.getTreatmentById
)

export default router