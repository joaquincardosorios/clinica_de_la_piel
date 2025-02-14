import mongoose, { Schema, Document, Types } from 'mongoose';
import Patient from './Patient';

const statusTreatment = {
    pending: 'Pendiente',
    inProgress: 'En progreso',
    completed: 'Completado',
    canceled: 'Cancelado',
} as const

export type StatusTreatment = typeof statusTreatment[keyof typeof statusTreatment]

export interface ITreatment extends Document {
    patient: Types.ObjectId
    service: Types.ObjectId
    finalPrice?: number
    finalSessions?: number
    sessionDuration?: number[]
    discount?: number
    status: StatusTreatment
}

const TreatmentSchema = new Schema<ITreatment>({
    patient: { 
        type: Schema.Types.ObjectId, 
        ref: 'Patient', 
        required: true 
    },
    service: { 
        type: Schema.Types.ObjectId, 
        ref: 'Service', 
        required: true 
    },
    finalPrice: { 
        type: Number, 
        required: false 
    },
    finalSessions: { 
        type: Number, 
        required: false 
    },
    sessionDuration: { 
        type: [Number], 
        required: true,
        validate: {
            validator: function (arr: number[]) {
                return arr.length === this.finalSessions
            },
            message: "La cantidad de sesiones y la cantidad de duraciones deben coincidir.",
        },
    },
    discount: { 
        type: Number, 
        required: false,
        default: 0 
    },
    status: {
        type: String,
        enum: Object.values(statusTreatment),
        default: statusTreatment.pending,
        required: true,
    }
}, {
    timestamps: true,
})

TreatmentSchema.post('save', async function (treatment) {
    try {
        const patient = await Patient.findById(treatment.patient)
        if(patient){
            if(!patient.treatments.includes(treatment.id)){
                patient.treatments.push(treatment.id)
                await patient.save()
            }
        }
    } catch (error) {
        console.error("Error actualizando el paciente con el tratamiento:", error);
    }

})

const Treatment = mongoose.model<ITreatment>('Treatment', TreatmentSchema);
export default Treatment;
