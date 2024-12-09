import { Router } from "express";
import * as EventController from "../../controllers/events.controller";

const router = Router();

router.get("/", EventController.getEvents);
router.post("/", EventController.createEvent);
router.put("/", EventController.updateEvent);
router.delete("/", EventController.deleteEvent);


export default router;
