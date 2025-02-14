import mongoose, { Schema, Document, Types } from 'mongoose';

interface ITreatment extends Document {
    patientId: Types.ObjectId
    baseTreatmentId: Types.ObjectId
    finalPrice: number
    finalSessions: number
    sessionDuration: number
    discount?: number
}

const TreatmentSchema = new Schema<ITreatment>({
    patientId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Patient', 
        required: true 
    },
    baseTreatmentId: { 
        type: Schema.Types.ObjectId, 
        ref: 'TreatmentBase', 
        required: true 
    },
    finalPrice: { 
        type: Number, 
        required: true 
    },
    finalSessions: { 
        type: Number, 
        required: true 
    },
    sessionDuration: { 
        type: Number, 
        required: true 
    },
    discount: { 
        type: Number, 
        default: 0 
    }
})

const Treatment = mongoose.model<ITreatment>('Treatment', TreatmentSchema);
export default Treatment;
