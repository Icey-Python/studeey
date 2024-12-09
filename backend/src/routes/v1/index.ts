import { Router } from "express";
import notesGroup from "./notesGroup";
import userGroup from "./userGroup";
import eventsGroup from "./eventsGroup";

const v1: Router = Router();

v1.use('/user', userGroup)
v1.use('/notes', notesGroup)
v1.use('/events', eventsGroup)


export default v1
