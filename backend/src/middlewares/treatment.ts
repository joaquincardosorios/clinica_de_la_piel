import type {Request, Response, NextFunction} from 'express'
import Treatment, { ITreatment } from '../models/Treatment'

declare global {
    namespace Express {
        interface Request {
            treatment?: ITreatment
        }
    }
}

export async function treatmentExist(req: Request, res: Response, next: NextFunction){
    const treatmentId  = req.params.treatmentId || req.body.treatmentId
    try {
        const treatment = await Treatment.findById(treatmentId)
        if(!treatment){
            const error = new Error('Tratamiento no econtrado')
            res.status(404).json({errors: [{msg: error.message}]})
            return
        }
        req.treatment = treatment
        next()
    } catch (error) {
        next(error)
    }

}