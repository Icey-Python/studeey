import { Router } from 'express'
import * as EventController from '../../controllers/events.controller'
import { userAuth } from '../../middleware/auth'

const router = Router()

router.get('/', userAuth, EventController.getEvents)
router.post('/', userAuth, EventController.createEvent)
router.put('/', userAuth, EventController.updateEvent)
router.delete('/', userAuth, EventController.deleteEvent)

export default router
