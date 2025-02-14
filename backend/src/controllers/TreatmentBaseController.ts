import type { Request, Response } from 'express'
import { handleError } from '../utils/errors'
import TreatmentBase from '../models/TreatmentBase'

export class TreatmentBaseController {
    static createTreatmentBase = async (req: Request, res: Response) => {
        const treatmentBase = new TreatmentBase(req.body)
        try {
            await treatmentBase.save()
            res.send('Tratamiento creado con exito')
        } catch (error) {
            handleError(res, error, "Failed to create the Treatment Base")
        }
    }

    static getAllTreatmentBase = async (req: Request, res: Response) => {
        try {
            const treatmentsBase = await TreatmentBase.find()
            res.send(treatmentsBase)
        } catch (error) {
            handleError(res, error, "Failed to fetch the treatments")
        }
    }

    static getTreatmentBaseById = async (req: Request, res: Response) => {
        const { treatmentBase } = req
        try{
            res.send(treatmentBase)
        } catch (error) {
            handleError(res, error, "Failed to fetch the treatments")
        }
    }

    static updateTreatmentBase = async (req: Request, res: Response) => {
        const { treatmentBase }  = req

        treatmentBase.name = req.body.name
        treatmentBase.basePrice = req.body.basePrice
        treatmentBase.baseSessions = req.body.baseSessions
        treatmentBase.sessionDuration = req.body.sessionDuration

        try {
            await treatmentBase.save()
            res.send('Tratamiento actualizado con exito')
        } catch (error) {
            handleError(res, error, "Failed to update the treatments")
        }
    }

    static deleteTreatmentBase = async (req: Request, res: Response) => {
        const { treatmentBase } = req
        try {
            await treatmentBase.deleteOne()
            res.send('Tratamiento eliminado con exito')
        }catch (error) {
            handleError(res, error, "Failed to delete the treatments")
        }
    }


}