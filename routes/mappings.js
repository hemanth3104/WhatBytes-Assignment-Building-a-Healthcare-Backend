import express from 'express'
import auth from '../middileware/auth.js'
import { body } from 'express-validator'
import { createMapping, deleteMapping, getDoctorsForPatient, getMappings } from '../controllers/mappingController.js'

const router=express.Router()

router.post('/',auth, [
    body('patientId').notEmpty().withMessage('patientId required'),
    body('doctorId').notEmpty().withMessage('doctorId required')
], createMapping)
router.get('/', auth, getMappings)
router.get('/:patientId',auth, getDoctorsForPatient)
router.delete('/:id',auth, deleteMapping)

export default router