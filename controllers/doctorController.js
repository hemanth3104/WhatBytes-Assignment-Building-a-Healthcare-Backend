import { validationResult } from "express-validator";
import Doctor from '../models/Doctor.js'

export const createDoctor = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  try {
    const d = new Doctor(req.body)
    await d.save()
    res.status(201).json(d)
  }
  catch(err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort('name')
    res.json(doctors)
  }
  catch(err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

export const getDoctorById = async (req, res) => {
  try {
    const d = await Doctor.findById(req.params.id);
    if (!d) return res.status(404).json({ message: 'Doctor not found' });
    res.json(d);
  }
  catch(err) {
    console.error(err);
    res.status(404).json({ message: 'Doctor not found' })
  }
}

export const updateDoctor = async (req, res) => {
  try {
    const d = await Doctor.findById(req.params.id)
    if (!d) return res.status(404).json({ message: 'Doctor not found' })
    Object.assign(d, req.body)
    await d.save()
    res.json(d)
  }
  catch(err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

export const deleteDoctor = async (req, res) => {
  try {
    const d = await Doctor.findById(req.params.id)
    if (!d) return res.status(404).json({ message: 'Doctor not found' })
    await d.deleteOne()
    res.json({ message: 'Doctor removed' })
  }
  catch(err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}