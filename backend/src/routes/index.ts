import { Router } from "express"
import patientRoutes from './patientRoutes'
import treatmentRoutes from "./treatmentRoutes"
import appointmentRoutes from "./appointmentRoutes"
import serviceRoutes from "./serviceRoutes"

const router = Router()

// Pacientes
router.use('/patient', patientRoutes)
router.use('/patient/:patientId/treatment', treatmentRoutes)

router.use('/appointment', appointmentRoutes)

// Servicios
router.use('/settings/service', serviceRoutes)

export default router