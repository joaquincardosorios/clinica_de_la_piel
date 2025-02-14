import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";

export interface IAppointment extends Document {
    patient: Types.ObjectId
    date: Date
    status: string
    notes: string
}

class Appointment extends Model {
    public id!: string
    // public patientId!: string
    // public specialistId!: string
    // public tratamientoId!: string
    public date!: Date
    public status: string
    public notes: string
}

Appointment.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true
    },
    // patientId: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     references: {
    //         model: 'Patient',
    //         key: 'id'
    //     }
    // },
    // specialistId: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //       model: 'specialists', 
    //       key: 'id',
    //     },
    // },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'scheduled'
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true,
    }},
    {
        sequelize: db,
        modelName: 'Appointment',
        tableName: 'appointments',
        timestamps: true,
    }
)

export default Appointment