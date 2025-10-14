import { validationResult } from "express-validator";
import Patient from '../models/Patient.js'

export const createPatient = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    const p = new Patient({ ...req.body, createdBy: req.user._id })
    await p.save()
    res.status(201).json(p)
  }
  catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
}

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ createdBy: req.user._id }).sort('-createdAt')
    res.json(patients)
  }
  catch(err){
    console.error(err)
    res.status(500).send('Server error')
  }
}

export const getPatientById = async (req, res) => {
  try {
    const p = await Patient.findById(req.params.id)
    if (!p) return res.status(404).json({ message: 'Patient not found' })
    if (String(p.createdBy) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' })
    res.json(p)
  }
  catch(err){
    console.error(err)
    res.status(404).json({ message: 'Patient not found' })
  }
}

export const updatePatient = async (req, res) => {
  try {
    const p = await Patient.findById(req.params.id)
    if (!p) return res.status(404).json({ message: 'Patient not found' })
    if (String(p.createdBy) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' })
    Object.assign(p, req.body)
    await p.save()
    res.json(p)
  }
  catch(err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

export const deletePatient = async (req, res) => {
  try {
    const p = await Patient.findById(req.params.id)
    if (!p) return res.status(404).json({ message: 'Patient not found' })
    if (String(p.createdBy) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' })
    await p.deleteOne()
    res.json({ message: 'Patient removed' })
  }
  catch(err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}