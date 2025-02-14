import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Patient from '../src/models/Patient'
import TreatmentBase from '../src/models/Service'

dotenv.config();

const patients = [
    {
        rut: '17351369-0',
        names: 'Joaquin Arturo',
        last_names: 'Rios Cardoso',
        dob: '1990-01-09',
        address: 'Av. Collao 821',
        city: 'Concepcion',
        prevision: 'Fonasa',
        phone: '941728681',
        email: 'juako.r@gmail.com'
    },
    {
        rut: '18155944-6',
        names: 'Victoria Javiera',
        last_names: 'Rios Cardoso',
        dob: '1993-02-13',
        address: 'La espiga 767',
        city: 'Chillan',
        prevision: 'Isapre',
        phone: '999999999',
        email: 'vicky_cardoso93@example.com'
    },
    {
        rut: '7298864-7',
        names: 'Eliana Elizabeth',
        last_names: 'Cardoso Urquiza',
        dob: '1959-10-15',
        address: 'La espiga 767',
        city: 'Chillan',
        prevision: 'Particular',
        phone: '999999999',
        email: 'nacaur@gmail.com'
    },
    {
        rut: '7298867-1',
        names: 'Nora Victoria',
        last_names: 'Cardoso Urquiza',
        dob: '1959-10-15',
        address: 'Vega de Saldias 674',
        city: 'Chillan',
        prevision: 'Particular',
        phone: '999999999',
        email: 'nocaur@gmail.com'
    },
    {
        rut: '28944266-7',
        names: 'Kathleen Marguerite',
        last_names: 'Sta Teresa',
        dob: '1990-02-08',
        address: 'Muymuy lejano',
        city: 'Zamboanga',
        prevision: 'Fonasa',
        phone: '999999999',
        email: 'miyudanger21@gmail.com'
    },
];

const treatmentsBase = [
    {
        name : "Limpieza facial",
        basePrice : 45000,
        baseSessions : 3,
        sessionDuration : [60, 60, 60]
    },
    {
        name : "Servicios podoglogicos",
        basePrice : 12000,
        baseSessions : 1,
        sessionDuration : [60]
    },
    {
        name : "Consulta medica general",
        basePrice : 35000,
        baseSessions : 1,
        sessionDuration : [20]
    },
    {
        name : "Borrado de tatuajes",
        basePrice : 150000,
        baseSessions : 5,
        sessionDuration : [30, 30, 30, 30,30]
    },
]

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string)
        console.log('📦 Conectado a MongoDB')

        await Patient.deleteMany();
        console.log('🗑️ Pacientes eliminados')

        await TreatmentBase.deleteMany();
        console.log('🗑️ Servicios eliminados')

        await Patient.insertMany(patients);
        console.log('✅ Pacientes insertados correctamente')

        await TreatmentBase.insertMany(treatmentsBase);
        console.log('✅ Servicios insertados correctamente')

    } catch (error) {
        console.error('❌ Error en el seed:', error)
    } finally {
        mongoose.connection.close()
        console.log('🔌 Conexión cerrada')
    }
};

seedDB();