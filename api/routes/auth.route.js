import expres from 'express'
import { googleAuth, signOut, signin, signup } from '../controllers/auth.controller.js'

const router = expres.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', googleAuth)
router.get('/signout', signOut)

export default router;
