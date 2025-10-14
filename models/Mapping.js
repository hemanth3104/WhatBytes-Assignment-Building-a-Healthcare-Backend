import mongoose from 'mongoose'

const MappingSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

MappingSchema.index({ patient: 1, doctor: 1 }, { unique: true })

export default mongoose.model('Mapping', MappingSchema)