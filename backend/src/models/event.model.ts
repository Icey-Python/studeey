import mongoose, { Schema, Document, Types } from 'mongoose'

interface IEvent extends Document {
  user: Types.ObjectId
  title: string
  description: string
  date: Date
  type: 'study_session' | 'assignment' | 'exam'
  linkedNotes: string[]
  reminder?: boolean
}

const EventSchema = new Schema<IEvent>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['study_session', 'assignment', 'exam'],
    required: true,
  },
  linkedNotes: [{ type: String, ref: 'Note' }],
  reminder: {
    type: Boolean,
    default: false,
  },
})

export const Event = mongoose.model<IEvent>('Event', EventSchema)
