import { Logger } from 'borgen'
import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'
import Note from '../models/note.model'
import { processOCR } from '../services/ocr.service'
import { IServerResponse } from '../types'

// Create New Note
// @route POST /api/v1/note
export const uploadNote = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { title, content, tags, format } = req.body
    if (!title || !content || !tags || !format) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Missing required fields',
        data: null,
      })
    }
    const file = req.file
    if (!file) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'No file uploaded',
        data: null,
      })
    }

    const owner = res.locals.user

    let note = new Note({
      title,
      content,
      owner,
      tags,
      format,
      filepath: file.path,
    })
    note = await note.save()

    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: '',
      data: {
        note,
      },
    })
  } catch (err) {
    Logger.error({ message: 'Error uploading note' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error uploading note',
      data: null,
    })
  }
}

// Get All Notes
// @route GET /api/v1/note/all/?page=1&limit=10
export const getAllNotes = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const [notes, totalNotes] = await Promise.all([
      Note.find().skip(skip).limit(limit),
      Note.countDocuments(),
    ])

    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Successfully fetched notes',
      data: {
        notes,
        totalNotes,
      },
    })
  } catch (err) {
    Logger.error({ message: 'Error getting notes' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting notes',
      data: null,
    })
  }
}

// Filter Notes By Tags
// @route GET /api/v1/note/tags/?tags=tag1,tag2
export const filterNotesByTags = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const tags = req.query.tags as string
    const notes = await Note.find({ tags: { $in: tags.split(',') } })
    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Successfully fetched notes',
      data: notes,
    })
  } catch (err) {
    Logger.error({ message: 'Error getting notes' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting notes',
      data: null,
    })
  }
}

// Get a Particular Note
// @route GET /api/v1/note/?id=note
export const getNote = async (req: Request, res: Response<IServerResponse>) => {
  try {
    const note = await Note.findById(req.query.id)
    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: '',
      data: note,
    })
  } catch (err) {
    Logger.error({ message: 'Error getting a note' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting a note',
      data: null,
    })
  }
}

// OCR Note
// @route POST /api/v1/note/ocr/
export const ocrNote = async (req: Request, res: Response<IServerResponse>) => {
  try {
    const { filepath } = req.body
    const text = await processOCR(filepath)
    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Success processing note',
      data: text,
    })
  } catch (err) {
    Logger.error({ message: 'Error processing notes in OCR' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error OCR notes',
      data: null,
    })
  }
}

// Search Notes
// @route GET /api/v1/note/search/?query=note
export const searchNotes = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const query = req.query.query as string
    const notes = await Note.find({ title: { $regex: query, $options: 'i' } })
    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Successfully fetched notes',
      data: notes,
    })
  } catch (err) {
    Logger.error({ message: 'Error getting notes' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error searching notes',
      data: null,
    })
  }
}

// Delete Note By Owner of the Note
// @route DELETE /api/v1/note/?id=note
export const deleteNote = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    if (!req.query.id) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Missing required fields',
        data: null,
      })
    }
    await Note.findByIdAndDelete(req.query.id)
    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Successfully deleted note',
      data: null,
    })
  } catch (err) {
    Logger.error({ message: 'Error deleting note' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error deleting note',
      data: null,
    })
  }
}

// Update Note By Owner of the Note
// @route PUT /api/v1/note/?id=note
export const updateNote = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const note = await Note.findByIdAndUpdate(req.query.id, req.body)
    if (!note) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Note not found',
        data: null,
      })
    }
    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Updated note successfully',
      data: note,
    })
  } catch (err) {
    Logger.error({ message: 'Error updating note' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error updating note',
      data: null,
    })
  }
}

// Share Note
// @route POST /api/v1/note/share/
export const shareNote = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { id, sharedWith } = req.body
    if (!id || !sharedWith) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Missing required fields',
        data: null,
      })
    }

    const note = await Note.findById(id)
    if (!note) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Note not found',
        data: null,
      })
    }

    if (note.owner !== res.locals.user) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'You are not the owner of this note',
        data: null,
      })
    }

    note.sharedWith.push(sharedWith)
    await note.save()

    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Shared note successfully',
      data: note,
    })
  } catch (err) {
    Logger.error({ message: 'Error sharing notes' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error sharing notes',
      data: null,
    })
  }
}

// Get Shared Notes
// @route GET /api/v1/note/shared/?page=1&limit=10
export const getSharedNotes = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const notes = await Note.find({
      sharedWith: { $elemMatch: { userId: res.locals.user } },
    })
      .skip(skip)
      .limit(limit)
    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: '',
      data: notes,
    })
  } catch (err) {
    Logger.error({ message: 'Error getting notes' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting notes',
      data: null,
    })
  }
}
