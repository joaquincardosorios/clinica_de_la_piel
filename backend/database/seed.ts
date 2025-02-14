import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Patient from '../src/models/Patient'
import Service from '../src/models/Service'
import Treatment from '../src/models/Treatment'

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

const services = [
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

const treatments = [
    {
        patient : null,
        service : null,
        finalPrice : 0,
        finalSessions : 0,
        sessionDuration : [0],
        discount : 10000
    },
    {
        patient : null,
        service : null,
        finalPrice : 0,
        finalSessions : 0,
        sessionDuration : [0],
        discount: 0
    },
    {
        patient : null,
        service : null,
        finalPrice : 0,
        finalSessions : 0,
        sessionDuration : [0],
        discount : 10000
    },
    {
        patient : null,
        service : null,
        finalPrice : 0,
        finalSessions : 0,
        sessionDuration : [0],
        discount : 10000
    },
]

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string)
        console.log('📦 Conectado a MongoDB')

        await Treatment.deleteMany();
        console.log('🗑️ Tratamientos eliminados')

        await Patient.deleteMany();
        console.log('🗑️ Pacientes eliminados')

        await Service.deleteMany();
        console.log('🗑️ Servicios eliminados')

        const patientsCreated = await Patient.insertMany(patients);
        console.log('✅ Pacientes insertados correctamente')

        const servicesCreated = await Service.insertMany(services);
        console.log('✅ Servicios insertados correctamente')

        
        treatments[0].patient = patientsCreated[0].id
        treatments[0].service = servicesCreated[0].id
        treatments[0].finalPrice = servicesCreated[0].basePrice - treatments[0].discount
        treatments[0].finalSessions = servicesCreated[0].baseSessions
        treatments[0].sessionDuration = servicesCreated[0].sessionDuration
        
        treatments[1].patient = patientsCreated[1].id
        treatments[1].service = servicesCreated[0].id
        treatments[1].finalPrice = servicesCreated[0].basePrice - treatments[1].discount
        treatments[1].finalSessions = servicesCreated[0].baseSessions
        treatments[1].sessionDuration = servicesCreated[0].sessionDuration
        
        treatments[2].patient = patientsCreated[1].id
        treatments[2].service = servicesCreated[3].id
        treatments[2].finalPrice = servicesCreated[3].basePrice - treatments[2].discount
        treatments[2].finalSessions = servicesCreated[3].baseSessions
        treatments[2].sessionDuration = servicesCreated[3].sessionDuration
        
        treatments[3].patient = patientsCreated[1].id
        treatments[3].service = servicesCreated[2].id
        treatments[3].finalPrice = servicesCreated[2].basePrice - treatments[3].discount
        treatments[3].finalSessions = servicesCreated[2].baseSessions
        treatments[3].sessionDuration = servicesCreated[2].sessionDuration

        const treatmentsCreated = await Treatment.insertMany(treatments);
        console.log('✅ Tratamientos insertados correctamente')



    } catch (error) {
        console.error('❌ Error en el seed:', error)
    } finally {
        mongoose.connection.close()
        console.log('🔌 Conexión cerrada')
    }
};

seedDB();