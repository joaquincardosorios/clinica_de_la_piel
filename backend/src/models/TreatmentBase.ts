import mongoose, { Schema, Document } from 'mongoose';

export interface ITreatmentBase extends Document {
    name: string
    // specialist: string
    basePrice: number
    baseSessions: number
    sessionDuration: number[]
}

const TreatmentBaseSchema = new Schema<ITreatmentBase>({
    name: { type: String, required: true, unique: true },
    // specialist: { type: String, required: true },
    basePrice: { type: Number, required: true },
    baseSessions: { type: Number, required: true },
    sessionDuration: { 
        type: [Number], 
        required: true,
        validate: {
            validator: function (arr: number[]) {
                return arr.length === this.baseSessions
            },
            message: "La cantidad de sesiones y la cantidad de duraciones deben coincidir.",
        },
    },
})

const TreatmentBase = mongoose.model<ITreatmentBase>('TreatmentBase', TreatmentBaseSchema)
export default TreatmentBase
