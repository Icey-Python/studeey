import { Router } from 'express'
import * as AIController from '../../controllers/ai.controller'
import { userAuth } from '../../middleware/auth'

const router = Router()

router.post('/chat', AIController.sendMessage)

export default router

