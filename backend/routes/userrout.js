
import express from 'express'
import {changePassword, generateResetlink, signIn,signUp} from '../controllers/userController.js';

const router = express.Router()
router.post('/register',signUp)
router.post('/login',signIn)
router.post('/forgotpassword',generateResetlink)
router.post('/resetpassword/:id/:token',changePassword)


export default router
