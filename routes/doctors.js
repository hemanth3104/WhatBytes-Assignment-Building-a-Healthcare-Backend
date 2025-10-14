import express from 'express'
import auth from '../middileware/auth.js'
import { body } from 'express-validator'
import { createDoctor, deleteDoctor, getDoctorById, getDoctors, updateDoctor } from '../controllers/doctorController.js'

const router=express.Router()

router.post('/', auth, [body('name').notEmpty().withMessage('Name required')], createDoctor)
router.get('/', getDoctors)
router.get('/:id', getDoctorById)
router.put('/:id',auth, updateDoctor)
router.delete('/:id',auth, deleteDoctor)

export default router