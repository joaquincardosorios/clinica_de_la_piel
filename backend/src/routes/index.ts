import { Router } from "express"
import patientRoutes from './patientRouter'

const router = Router()

router.use('/patient', patientRoutes)

export default router