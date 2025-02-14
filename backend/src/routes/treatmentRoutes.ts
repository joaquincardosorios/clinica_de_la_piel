import { Router } from 'express'
import { handleInputErrors, validatePatientIdType, validateTreatmentForm, validateTreatmentIdType } from '../middlewares/validations'
import { TreatmentController } from '../controllers/TreatmentController'
import { serviceExist } from '../middlewares/service'
import { treatmentExist } from '../middlewares/treatment'
import { patientExist } from '../middlewares/patients'

const router = Router({ mergeParams: true })

router.use(validatePatientIdType) 
router.param('treatmentId',validateTreatmentIdType)
router.use(handleInputErrors)

router.use(patientExist)
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