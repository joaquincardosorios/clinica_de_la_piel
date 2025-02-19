import {z} from 'zod'

// Pacientes
export const previsionSchema = z.enum(['Fonasa', 'Isapre', 'Particular'])
export type Prevision = z.infer<typeof previsionSchema>

const PatientSchema = z.object({
    _id: z.string(),
    rut: z.string(),
    names: z.string(),
    last_names: z.string(),
    dob: z.string(),
    address: z.string(),
    city: z.string(),
    prevision: previsionSchema,
    phone: z.string(),
    email: z.string().optional(),
})

export const dashboardPatientSchema = z.object({
    patients: z.array(
        PatientSchema.pick({
            _id: true,
            rut: true,
            names: true,
            last_names: true,
        })
    ),
    totalPages: z.number(),
    totalPatients: z.number(),
})

export type Patient = z.infer<typeof PatientSchema>
export type PatientListInfo = z.infer<typeof dashboardPatientSchema>
export type PatientSearchForm = Pick<Patient, 'rut'| 'last_names'>