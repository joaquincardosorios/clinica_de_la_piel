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
}