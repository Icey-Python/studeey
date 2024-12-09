import { Router } from "express";
import { upload } from "../../middleware/file-upload";
import * as noteController from "../../controllers/notes.controller";

const router = Router();

router.post("/", upload.single("file"), noteController.uploadNote);
router.post("/ocr", noteController.ocrNote);
router.post("/share", noteController.shareNote);
router.get("/all", noteController.getAllNotes);
router.get("/", noteController.getNote);
router.get("/search", noteController.searchNotes);
router.get("/tags", noteController.filterNotesByTags);
router.get("/shared", noteController.getSharedNotes);
router.put("/", noteController.updateNote);
router.delete("/", noteController.deleteNote);

export default router;

