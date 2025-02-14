import type {Request, Response, NextFunction} from 'express'
import Patient, { IPatient } from '../models/Patient'

declare global {
    namespace Express {
        interface Request {
            patient?: IPatient
        }
    }
}

export async function patientAlreadyExist(req: Request, res: Response, next: NextFunction){
    const { rut } = req.body
    try {
        const patientExist = await Patient.findOne({rut})
        if(patientExist){
            const error = new Error('User already exist')
            res.status(409).json({ errors: [{msg : error.message}]})
            return
        }
        next()
    } catch (error) {
        next(error)
    }
}

export async function patientExist(req: Request, res: Response, next: NextFunction){
    const { patientId } = req.params || req.body
    try {
        const patient = await Patient.findById(patientId)
        if(!patient){
            const error = new Error('Patient not found')
            res.status(404).json({errors: [{msg: error.message}]})
            return
        }
        req.patient = patient
        next()
    } catch (error) {
        next(error)
    }

}