import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

import { corsConfig } from './config/cors'
import { connectDB } from './config/db'
import routes from './routes/index'
dotenv.config()

connectDB()


const app = express()
app.use(cors(corsConfig))

//Logging
app.use(morgan('dev'))

// Read data from forms
app.use(express.json())

// Enrutador
app.use('/api',routes)

app.get("/ping", (req, res) => {
    res.send("Servidor backend funcionando 🚀");
});



export default app