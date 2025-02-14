import type { Request, Response } from 'express'
import { handleError } from '../utils/errors'
import Treatment from '../models/Treatment'

export class TreatmentController {
    static createTreatment = async (req: Request, res: Response) => {
        const { patient, service } = req

        const treatmentForm = { 
            patient: patient._id,
            service: service._id,
            finalPrice: req.body.discount ? service.basePrice - req.body.discount : service.basePrice,
            finalSessions: req.body.finalSessions ? req.body.finalSessions : service.baseSessions,
            discount: req.body.discount ? req.body.discount : 0,
        }

        const treatment = new Treatment(treatmentForm)
        try {
            await treatment.save()
            res.send('Tratamiento creado con exito')
        } catch (error) {
            handleError(res, error, "Failed to create the Treatment")
        }
    }

    static getAllTreatment = async (req: Request, res: Response) => {
        const { patient} = req
        try {
            const treatments = await Treatment.find({
                $and:[ 
                    { patient: patient.id }
                ]
            })
            res.send(treatments)
        } catch (error) {
            handleError(res, error, "Failed to fetch the treatments")
        }
    }

    static getTreatmentById = async (req: Request, res: Response) => {
        const { treatment } = req
        res.send(treatment)
    }

    static updateTreatment = async (req: Request, res: Response) => {
        const { treatment }  = req

        treatment.finalPrice = req.body.finalPrice
        treatment.finalSessions = req.body.finalSessions
        treatment.sessionDuration = req.body.sessionDuration
        treatment.status = req.body.status

        try {
            await treatment.save()
            res.send('Tratamiento actualizado con exito')
        } catch (error) {
            handleError(res, error, "Failed to update the treatment")
        }
    }

    static deleteTreatment = async (req: Request, res: Response) => {
        const { treatment } = req
        try {
            await treatment.deleteOne()
            res.send('Tratamiento eliminado con exito')
        }catch (error) {
            handleError(res, error, "Failed to delete the treatment")
        }
    }


}