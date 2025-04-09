import express from 'express'
import { checkToken, getUserProfile, login, register, updateRole } from '../controllers/user.controller.js'
import { verifyRoles, verifyToken } from '../middleware/auth.middleware.js'
import ROLES from '../constants/roles.js'



const router = express.Router()

router.get('/', verifyToken, checkToken)

router.post('/register', register)
router.post('/login', login)

router.post('/role/:id', verifyToken, verifyRoles(ROLES.ADMIN), updateRole)

router.get('/profile', verifyToken, getUserProfile)
router.get('/check', verifyToken, checkToken);

export default router