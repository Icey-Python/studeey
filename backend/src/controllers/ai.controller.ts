import { Logger } from 'borgen'
import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'
import { IServerResponse } from '../types'
import { normalChat } from '../services/ai.service'

//@ desc send message 
//@ route POST /api/v1/ai/message
export const sendMessage = async (req: Request, res: Response<IServerResponse>) => {
  try {
   const { message} = req.body
   const response = await normalChat(message)
   return res.status(HttpStatusCode.Ok).json({
    status: 'success',
    message: 'Message sent successfully',
    data: {
     response
    },
   })
  } catch (error) {
   Logger.error({message: 'Error sending message' + error})
   return res.status(HttpStatusCode.InternalServerError).json({
    status: 'error',
    message: 'Error sending message',
    data: null,
   })
  }
}
