import mongoose from 'mongoose'

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String },
  contact: { type: String },
  hospital: { type: String }
}, { timestamps: true })

export default mongoose.model('Doctor', DoctorSchema)