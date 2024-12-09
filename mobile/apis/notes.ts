import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiBase } from './user'

apiBase.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('userToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  } catch (error) {
    console.error('Error retrieving token', error)
    return config
  }
}, (error) => {
  return Promise.reject(error)
})

interface IUploadNote {
  title: string
  description: string
  tags: string[]
  format: 'pdf' | 'image' | 'text'
  file: any // FormData or file object
}
// Upload a new note
// @route POST /api/v1/notes
export const uploadNote = async (noteData: IUploadNote) => {
  try {
    const formData = new FormData()
    formData.append('title', noteData.title)
    formData.append('description', noteData.description)
    formData.append('tags', JSON.stringify(noteData.tags))
    formData.append('format', noteData.format)
    formData.append('file', noteData.file)

    const response = await apiBase.post('/notes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to upload note')
  }
}

interface IOCRNote {
  noteId: string
}
// Perform OCR on a note
// @route POST /api/v1/notes/ocr
export const ocrNote = async (data: IOCRNote) => {
  try {
    const response = await apiBase.post('/notes/ocr', data)
    toast.success('OCR completed successfully')
    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to perform OCR')
  }
}

interface IShareNote {
  noteId: string
  sharedWith: string[]
  permissions: 'view' | 'edit'
}
// Share a note
// @route POST /api/v1/notes/share
export const shareNote = async (data: IShareNote) => {
  try {
    const response = await apiBase.post('/notes/share', data)
    toast.success('Note shared successfully')
    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to share note')
  }
}

interface IGetAllNotes {
  page: number
  limit: number
}
// Fetch all notes with pagination
// @route GET /api/v1/notes/all?page=1&limit=10
export const getAllNotes = async (params: IGetAllNotes) => {
  try {
    const response = await apiBase.get(
      `/notes/all?page=${params.page}&limit=${params.limit}`,
    )
    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to fetch notes')
  }
}

interface IGetNote {
  id: string
}
// Fetch a single note
// @route GET /api/v1/notes
export const getNote = async (params: IGetNote) => {
  try {
    const response = await apiBase.get(`/notes?id=${params.id}`)
    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to fetch note')
  }
}

interface ISearchNotes {
  query: string
}
// Search notes
// @route GET /api/v1/notes/search
export const searchNotes = async (params: ISearchNotes) => {
  try {
    const response = await apiBase.get(`/notes/search?query=${params.query}`)
    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to search notes')
  }
}

interface IFilterNotesByTags {
  tags: string[]
}
// Filter notes by tags
// @route GET /api/v1/notes/tags
export const filterNotesByTags = async (data: IFilterNotesByTags) => {
  try {
    const response = await apiBase.get(
      `/notes/tags?tags=${JSON.stringify(data.tags)}`,
    )
    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to filter notes')
  }
}

// Fetch shared notes
// @route GET /api/v1/notes/shared
export const getSharedNotes = async () => {
  try {
    const response = await apiBase.get('/notes/shared')
    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to fetch shared notes')
  }
}

interface IUpdateNote {
  id: string
  title?: string
  description?: string
  tags?: string[]
}
// Update a note
// @route PUT /api/v1/notes
export const updateNote = async (data: IUpdateNote) => {
  try {
    const response = await apiBase.put('/notes', data)
    toast.success('Note updated successfully')
    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to update note')
  }
}

interface IDeleteNote {
  id: string
}
// Delete a note
// @route DELETE /api/v1/notes
export const deleteNote = async (data: IDeleteNote) => {
  try {
    const response = await apiBase.delete('/notes', { data })
    toast.success('Note deleted successfully')
    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to delete note')
  }
}
