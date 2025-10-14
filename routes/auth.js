import express from 'express'
import { body } from 'express-validator'
import {register, login} from '../controllers/authController.js'

const router=express.Router()

router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name required'),
        body('email').isEmail().withMessage('Valid email required'),
        body('password').isLength({min:6}).withMessage('Password min 6 chars')
    ],
    register
)

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Valid email required'),
        body('password').exists().withMessage('Password is required')
    ],
    login
)

export default router