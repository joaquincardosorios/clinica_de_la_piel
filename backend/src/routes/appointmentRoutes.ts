import { Router } from 'express'
import { handleInputErrors, validateAppointmentForm, validateAppointmentIdType, validatePatientIdType, validateTreatmentForm, validateTreatmentIdType } from '../middlewares/validations'
import { AppointmentController } from '../controllers/AppointmentController'
import { treatmentExist } from '../middlewares/treatment'
import { patientExist } from '../middlewares/patients'
import { appointmentExist } from '../middlewares/appointment'

const router = Router()

router.use(validatePatientIdType) 
router.use(validateTreatmentIdType)
router.param('appointmentId', validateAppointmentIdType)
router.use(handleInputErrors)

router.use(patientExist)
router.use(treatmentExist) 
router.param('appointmentId', appointmentExist)

router.post('/',
    validateAppointmentForm,
    handleInputErrors,
    AppointmentController.createAppointment
)

router.get('/',
    AppointmentController.getAllAppointments
)

router.get('/:appointmentId',
    AppointmentController.getAppointmentById
)

router.put('/:appointmentId',
    validateAppointmentForm,
    handleInputErrors,
    AppointmentController.updateAppointment
)

router.delete('/:appointmentId',
    AppointmentController.deleteAppointment
)


export default router