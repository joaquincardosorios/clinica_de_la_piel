import { Router } from "express"
import patientRoutes from './patientRoutes'
import treatmentRoutes from "./treatmentRoutes"
import serviceRoutes from "./serviceRoutes"
import { handleInputErrors, validatePatientIdType } from "../middlewares/validations"
import { patientExist } from "../middlewares/patients"

const router = Router({ mergeParams: true})
// Pacientes
router.use('/patient', patientRoutes)

// Tratamientos
router.use('/patient/:patientId/treatment', 
    validatePatientIdType,
    handleInputErrors,
    patientExist,
    treatmentRoutes
)

// Servicios
router.use('/settings/service', serviceRoutes)

export default router