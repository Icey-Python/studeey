import mongoose, { Schema, Document } from 'mongoose'

interface ISharedWith {
  userId: string // ID of the user the note is shared with
  permission: 'view' | 'edit' // Permission type
}

interface INote extends Document {
  title: string
  content: string
  owner: mongoose.Schema.Types.ObjectId
  tags: string[]
  format: 'pdf' | 'image' | 'text'
  filepath: string
  sharedWith: ISharedWith[]
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: [String],
    format: {
      type: String,
      enum: ['pdf', 'image', 'text'],
      required: true,
    },
    filepath: String,
    sharedWith: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        permission: {
          type: String,
          enum: ['view', 'edit'],
          default: 'view',
        },
      },
    ],
  },
  { timestamps: true },
)

const Note = mongoose.model<INote>('Note', noteSchema)
export default Note
