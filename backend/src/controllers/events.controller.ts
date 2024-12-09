import { Logger } from 'borgen'
import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'
import { Event } from '../models/event.model'
import { IServerResponse } from '../types'

// Create Event
// @route POST /api/v1/event
export const createEvent = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { title, description, date, type, linkedNotes, reminder } = req.body
    const userId = res.locals.user

    if (!title || !date || !type) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Title, date, and type are required',
        data: null,
      })
    }

    const event = new Event({
      user: userId,
      title,
      description,
      date,
      type,
      linkedNotes,
      reminder,
    })

    await event.save()

    return res.status(HttpStatusCode.Created).json({
      status: 'success',
      message: 'Event created successfully',
      data: event,
    })
  } catch (err) {
    Logger.error({ message: 'Error creating event: ' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error creating event',
      data: null,
    })
  }
}

// Fetch Events
// @route GET /api/v1/event
export const getEvents = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const userId = res.locals.user

    const events = await Event.find({ user: userId }).populate('linkedNotes')

    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Events retrieved successfully',
      data: events,
    })
  } catch (err) {
    Logger.error({ message: 'Error fetching events: ' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error fetching events',
      data: null,
    })
  }
}

// Update an Event
// @route PUT /api/v1/event/?id=event
export const updateEvent = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { title, description, date, type, linkedNotes, reminder } = req.body
    const userId = res.locals.user

    const event = await Event.findOneAndUpdate(
      { _id: req.query.id, user: userId },
      { title, description, date, type, linkedNotes, reminder },
      { new: true },
    )

    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Event updated successfully',
      data: event,
    })
  } catch (err) {
    Logger.error({ message: 'Error updating event: ' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error updating event',
      data: null,
    })
  }
}

// Delete an Event
// @route DELETE /api/v1/event/?id=event
export const deleteEvent = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const userId = res.locals.user

    await Event.findOneAndDelete({ _id: req.query.id, user: userId })

    return res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'Event deleted successfully',
      data: null,
    })
  } catch (err) {
    Logger.error({ message: 'Error deleting event: ' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error deleting event',
      data: null,
    })
  }
}
