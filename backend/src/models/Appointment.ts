import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import Treatment from "./Treatment";

const statusAppointment = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    completed: 'Completada',
    canceled: 'Cancelada',
} as const

export type StatusAppointment = typeof statusAppointment[keyof typeof statusAppointment]

export interface IAppointment extends Document {
    treatment: Types.ObjectId
    date: Date
    status: StatusAppointment
    notes: string
}

const AppointmentSchema = new Schema<IAppointment>({
    treatment: { 
        type: Schema.Types.ObjectId, 
        ref: 'Treatment', 
        required: true 
    },
    date : {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(statusAppointment),
        default: statusAppointment.pending,
        required: true,
    },
    notes: {
        type: String,
        required: false,
        trim: true
    }
}, { timestamps : true} )

AppointmentSchema.pre('save', async function (next) {
    try {
        if (!this.isNew) return
        
        const treatment = await Treatment.findById(this.treatment)
        if(!treatment) {
            return next(new Error('Tratamiento no encontrado'))
        }
    
        const appointmentCount = treatment.appointments.length
        if (appointmentCount >= treatment.finalSessions){
            return next(new Error(`No se pueden agregar más citas. Se alcanzó el límite de ${treatment.finalSessions} citas.`))
        }
        next()
    } catch (error) {
        next(error)
    }
})

AppointmentSchema.post('save', async function (appointment) {
    try {
        const treatment = await Treatment.findById(appointment.treatment)
        if(treatment){
            if(!treatment.appointments.includes(appointment.id)){
                treatment.appointments.push(appointment.id)
                await treatment.save()
            }
        }
    } catch (error) {
        console.error("Error actualizando el paciente con el tratamiento:", error);
    }

})


const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema)
export default Appointment