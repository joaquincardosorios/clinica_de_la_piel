import type {Request, Response, NextFunction} from 'express'
import Service, { IService } from '../models/Service'

declare global {
    namespace Express {
        interface Request {
            service?: IService
        }
    }
}


export async function serviceExist(req: Request, res: Response, next: NextFunction){
    const serviceId = req.params.serviceId || req.body.serviceId
    try {
        const service = await Service.findById(serviceId)
        if(!service){
            const error = new Error('Servicio no encontrado')
            res.status(404).json({errors: [{msg: error.message}]})
            return
        }
        req.service = service
        next()
    } catch (error) {
        next(error)
    }

}