import type { Request, Response } from 'express'
import { handleError } from '../utils/errors'
import Treatment from '../models/Treatment'

export class TreatmentController {
    static createTreatment = async (req: Request, res: Response) => {
        const treatment = new Treatment(req.body)
        console.log(treatment)
        // try {
        //     await treatment.save()
        //     res.send('Tratamiento creado con exito')
        // } catch (error) {
        //     handleError(res, error, "Failed to create the Treatment")
        // }
    }

    // static getAllTreatmentBase = async (req: Request, res: Response) => {
    //     try {
    //         const treatmentsBase = await TreatmentBase.find()
    //         res.send(treatmentsBase)
    //     } catch (error) {
    //         handleError(res, error, "Failed to fetch the treatments")
    //     }
    // }

    // static getTreatmentBaseById = async (req: Request, res: Response) => {
    //     const { treatmentBase } = req
    //     try{
    //         res.send(treatmentBase)
    //     } catch (error) {
    //         handleError(res, error, "Failed to fetch the treatments")
    //     }
    // }

    // static updateTreatmentBase = async (req: Request, res: Response) => {
    //     const { treatmentBase }  = req

    //     treatmentBase.name = req.body.name
    //     treatmentBase.basePrice = req.body.basePrice
    //     treatmentBase.baseSessions = req.body.baseSessions
    //     treatmentBase.sessionDuration = req.body.sessionDuration

    //     try {
    //         await treatmentBase.save()
    //         res.send('Tratamiento actualizado con exito')
    //     } catch (error) {
    //         handleError(res, error, "Failed to update the treatments")
    //     }
    // }

    // static deleteTreatmentBase = async (req: Request, res: Response) => {
    //     const { treatmentBase } = req
    //     try {
    //         await treatmentBase.deleteOne()
    //         res.send('Tratamiento eliminado con exito')
    //     }catch (error) {
    //         handleError(res, error, "Failed to delete the treatments")
    //     }
    // }


}