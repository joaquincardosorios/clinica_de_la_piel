import type {Request, Response, NextFunction} from 'express'
import TreatmentBase, { ITreatmentBase } from '../models/TreatmentBase'

declare global {
    namespace Express {
        interface Request {
            treatmentBase?: ITreatmentBase
        }
    }
}


export async function treatmentBaseExist(req: Request, res: Response, next: NextFunction){
    const { treatmentBaseId } = req.params
    try {
        const treatmentBase = await TreatmentBase.findById(treatmentBaseId)
        if(!treatmentBase){
            const error = new Error('Tratamiento no encontrado')
            res.status(404).json({errors: [{msg: error.message}]})
            return
        }
        req.treatmentBase = treatmentBase
        next()
    } catch (error) {
        next(error)
    }

}