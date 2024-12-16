import { Router } from "express";
import notesGroup from "./notesGroup";
import userGroup from "./userGroup";
import eventsGroup from "./eventsGroup";
import aiGroup from "./aiGroup";

const v1: Router = Router();

v1.use('/auth', userGroup)
v1.use('/notes', notesGroup)
v1.use('/events', eventsGroup)
v1.use('/ai', aiGroup)


export default v1
