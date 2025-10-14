import { validationResult } from "express-validator";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Mapping from "../models/Mapping.js";

export const createMapping = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { patientId, doctorId } = req.body
  try {
    const patient = await Patient.findById(patientId)
    const doctor = await Doctor.findById(doctorId)
    if (!patient) return res.status(404).json({ message: 'Patient not found' })
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' })

    if (String(patient.createdBy) !== String(req.user._id)) {
      return res.status(403).json({ message: 'You can only assign doctors to your own patients' })
    }
    const mapping = new Mapping({ patient: patientId, doctor: doctorId, assignedBy: req.user._id })
    await mapping.save()
    res.status(201).json(mapping)
  }
  catch(err) {
    console.error(err)
    if (err.code === 11000) {
      return res.status(400).json({ message: 'This doctor is already assigned to this patient' })
    }
    res.status(500).send('Server error')
  }
}

export const getMappings = async (req, res) => {
  try {
    const mappings = await Mapping.find().populate('patient').populate('doctor').populate('assignedBy', 'name email')
    res.json(mappings)
  }
  catch(err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

export const getDoctorsForPatient = async (req, res) => {
  try {
    const patientId = req.params.patientId
    const mappings = await Mapping.find({ patient: patientId }).populate('doctor')
    res.json(mappings.map(m => m.doctor))
  }
  catch(err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

export const deleteMapping = async (req, res) => {
  try {
    const mapping = await Mapping.findById(req.params.id);
    if (!mapping) return res.status(404).json({ message: 'Mapping not found' })
    if (String(mapping.assignedBy) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    await mapping.remove()
    res.json({ message: 'Mapping removed' })
  }
  catch(err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}