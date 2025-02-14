import mongoose from 'mongoose'
import colors from 'colors'
import { exit } from 'node:process'
import dotenv from 'dotenv'
dotenv.config()

export const connectDB = async() => {
    try {
        const dbURI = process.env.DB_URI ;
        console.log(dbURI)
        const { connection } = await mongoose.connect(dbURI)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.magenta.bold(`MongoDB connected at ${url}`))
    } catch (error) {
        // console.log(error.message)
        console.log(colors.red.bold('Error to connect to MongoDB'))
        exit(1)
    }
}