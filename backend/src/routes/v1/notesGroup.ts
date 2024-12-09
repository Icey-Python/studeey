import { Router } from 'express'
import { upload } from '../../middleware/file-upload'
import * as noteController from '../../controllers/notes.controller'
import { userAuth } from '../../middleware/auth'

const router = Router()

router.post('/', userAuth, upload.single('file'), noteController.uploadNote)
router.post('/ocr', userAuth, noteController.ocrNote)
router.post('/share', userAuth, noteController.shareNote)
router.get('/all', userAuth, noteController.getAllNotes)
router.get('/', userAuth, noteController.getNote)
router.get('/search', userAuth, noteController.searchNotes)
router.get('/tags', userAuth, noteController.filterNotesByTags)
router.get('/shared', userAuth, noteController.getSharedNotes)
router.put('/', userAuth, noteController.updateNote)
router.delete('/', userAuth, noteController.deleteNote)

export default router
