import type { Request, Response } from 'express'
import Patient from '../models/Patient'
import { handleError } from '../utils/errors'

export class PatientController {
    static createPatient = async (req: Request, res: Response) => {
        const patient = new Patient(req.body)
        try {
            await patient.save()
            res.send('Paciente creado con exito')
        } catch (error) {
            handleError(res, error, "Failed to create the patient")
        }
    }

    static getPatients = async (req: Request, res: Response) => {
        try {
            const patients = await Patient.find()
            res.send(patients)
        } catch (error) {
            handleError(res, error, "Failed to fetch the patients")
        }
    }

    static getPatientById = async (req: Request, res: Response) => {
        const { patient } = req
        res.send(patient)
    }

    static updatePatient = async (req: Request, res: Response) => {
        const { patient } = req

        patient.rut = req.body.rut
        patient.names = req.body.names
        patient.last_names = req.body.last_names
        patient.dob = req.body.dob
        patient.address = req.body.address
        patient.city = req.body.city
        patient.prevision = req.body.prevision
        patient.phone = req.body.phone
        patient.email = req.body.email

        try {
            await patient.save()
            res.send('Paciente actualizado con exito')
        } catch (error) {
            handleError(res, error, "Failed to update the patient")
        }

    }

    static deletePatient = async (req: Request, res: Response) => {
        const { patient } = req
        try {
            await patient.deleteOne()
            res.send('Paciente eliminado con exito')
        }catch (error) {
            handleError(res, error, "Failed to update the patient")
        }
    }
            
}