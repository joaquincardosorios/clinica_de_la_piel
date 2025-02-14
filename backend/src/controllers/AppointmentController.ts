import type { Request, Response } from 'express'
import { handleError } from '../utils/errors'
import Appointment from '../models/Appointment'

export class AppointmentController {
    static createAppointment = async (req: Request, res: Response) => {
        const { treatment } = req

        const appointmentForm = { 
            treatment: treatment.id,
            date: req.body.date,
            status: req.body.status,
            notes: req.body.notes,
        }

        const appointment = new Appointment(appointmentForm)
        try {
            await appointment.save()
            res.send('Cita creada con exito')
        } catch (error) {
            handleError(res, error, "Failed to create the Appointment")
        }
    }

    static getAllAppointments = async (req: Request, res: Response) => {
        try {
            const appointment = await Appointment.find({})
                .populate({
                    path: 'treatment',
                    populate: [
                        { path: 'patient', select: '_id names last_names'},
                        { path: 'service', select: 'name'}
                    ]
                })
            res.send(appointment)
        } catch (error) {
            handleError(res, error, "Failed to fetch the appointment")
        }
    }

    static getAppointmentById = async (req: Request, res: Response) => {
        const { appointment } = req
        await appointment.populate({
            path: 'treatment',
            populate: [
                { path: 'patient', select: '_id names last_names' },
                { path: 'service', select: 'name' }
            ]
        })
        res.send(appointment)
    }

    static updateAppointment = async (req: Request, res: Response) => {
        const { appointment }  = req
        appointment.date = req.body.date
        appointment.status = req.body.status
        appointment.notes = req.body.notes

        try {
            await appointment.save()
            res.send('Cita actualizada con exito')
        } catch (error) {
            handleError(res, error, "Failed to update the appointment")
        }
    }

    static deleteAppointment = async (req: Request, res: Response) => {
        const { appointment } = req
        try {
            await appointment.deleteOne()
            res.send('Cita eliminada con exito')
        }catch (error) {
            handleError(res, error, "Failed to delete the appointment")
        }
    }
}