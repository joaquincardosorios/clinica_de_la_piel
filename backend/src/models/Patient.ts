import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";

const prevision = {
    FONASA: 'Fonosa',
    ISAPRE: 'Isapre',
    PARTICULAR: 'Particular',
} as const

export type Prevision = typeof prevision[keyof typeof prevision]

export interface IPatient extends Document {
    rut: string
    names: string
    last_names: string
    dob: Date
    address: string
    city: string
    prevision: Prevision
    phone: string
    treatments: Types.ObjectId[]
    email?: string
}

const PatientSchema: Schema = new Schema({
    rut: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    names: {
        type: String,
        required: true,
        trim: true,
    },
    last_names: {
        type: String,
        required: true,
        trim: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    prevision: {
        type: String,
        enum: Object.values(prevision),
        default: prevision.PARTICULAR,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    treatments: [{
        type: Types.ObjectId,
        ref: 'Treatment',
    }],
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
}, {
    timestamps: true,
})

const Patient = mongoose.model<IPatient>('Patient', PatientSchema)

export default Patient