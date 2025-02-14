import type {Request, Response, NextFunction} from 'express'
import Appointment, { IAppointment } from '../models/Appointment'

declare global {
    namespace Express {
        interface Request {
            appointment?: IAppointment
        }
    }
}

export async function appointmentExist(req: Request, res: Response, next: NextFunction){
    const appointmentId  = req.params.appointmentId || req.body.appointmentId
    try {
        const appointment = await Appointment.findById(appointmentId)
        if(!appointment){
            const error = new Error('Cita no econtrada')
            res.status(404).json({errors: [{msg: error.message}]})
            return
        }
        req.appointment = appointment
        next()
    } catch (error) {
        next(error)
    }

}