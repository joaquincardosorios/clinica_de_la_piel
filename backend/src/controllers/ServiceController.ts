import type { Request, Response } from 'express'
import { handleError } from '../utils/errors'
import Service from '../models/Service'

export class ServiceController {
    static createService = async (req: Request, res: Response) => {
        const service = new Service(req.body)
        try {
            await service.save()
            res.send('Servicio creado con exito')
        } catch (error) {
            handleError(res, error, "Failed to create the service")
        }
    }

    static getAllServices = async (req: Request, res: Response) => {
        try {
            const service = await Service.find()
            res.send(service)
        } catch (error) {
            handleError(res, error, "Failed to fetch the services")
        }
    }

    static getServiceById = async (req: Request, res: Response) => {
        const { service } = req
        try{
            res.send(service)
        } catch (error) {
            handleError(res, error, "Failed to fetch the service")
        }
    }

    static updateService = async (req: Request, res: Response) => {
        const { service }  = req

        service.name = req.body.name
        service.basePrice = req.body.basePrice
        service.baseSessions = req.body.baseSessions
        service.sessionDuration = req.body.sessionDuration

        try {
            await service.save()
            res.send('Servicio actualizado con exito')
        } catch (error) {
            handleError(res, error, "Failed to update the service")
        }
    }

    static deleteService = async (req: Request, res: Response) => {
        const { service } = req
        try {
            await service.deleteOne()
            res.send('Servicio eliminado con exito')
        }catch (error) {
            handleError(res, error, "Failed to delete the service")
        }
    }


}