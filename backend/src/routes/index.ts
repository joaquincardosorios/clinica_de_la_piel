import { Router } from "express"
import patientRoutes from './patientRoutes'
import treatmentRoutes from "./treatmentRoutes"
import treatmentBaseRoutes from "./treatmentBaseRoutes"

const router = Router()

router.use('/patient', patientRoutes)
router.use('/patient/:patientId/treatment', treatmentRoutes)

router.use('/settings/treatment-base', treatmentBaseRoutes)

export default router