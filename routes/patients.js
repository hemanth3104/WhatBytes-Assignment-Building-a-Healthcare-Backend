import express from 'express'
import { body } from 'express-validator'
import auth from '../middileware/auth.js'
import { createPatient, deletePatient, getPatientById, getPatients, updatePatient } from '../controllers/patientController.js'

const router = express.Router()

router.post('/', auth, [ body('name').notEmpty().withMessage('Name required') ], createPatient)
router.get('/', auth, getPatients)
router.get('/:id', auth, getPatientById)
router.put('/:id', auth, updatePatient)
router.delete('/:id', auth, deletePatient)

export default router