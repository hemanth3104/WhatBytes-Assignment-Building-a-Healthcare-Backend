import mongoose from 'mongoose'

const PatientSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, enum: ['male','female','other'], default: 'other' },
  contact: { type: String },
  address: { type: String },
  notes: { type: String }
}, { timestamps: true })

export default mongoose.model('Patient', PatientSchema)