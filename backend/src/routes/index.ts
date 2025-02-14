import { Router } from "express"
import patientRoutes from './patientRoutes'
import treatmentRoutes from "./treatmentRoutes"
import serviceRoutes from "./serviceRoutes"

const router = Router()

router.use('/patient', patientRoutes)
router.use('/patient/:patientId/treatment', treatmentRoutes)

router.use('/settings/service', serviceRoutes)

export default router