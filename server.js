import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './db.js'

import authRoutes from './routes/auth.js'
import patientRoutes from './routes/patients.js'
import doctorRoutes from './routes/doctors.js'
import mappingRoutes from './routes/mappings.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

connectDB(process.env.MONGODB_URL)

app.use('/api/auth', authRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/mappings', mappingRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
