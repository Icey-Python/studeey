import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'fs'
import path from 'path'
const genAI = new GoogleGenerativeAI('AIzaSyAC5Ae03ZAxUiH-_cEHNjcvZ1HaWi-93Nc')

interface ChatHistory {
  role: string
  parts: { text: string }[];
}
function fileToGenerativePart(imagePath: string, mimeType: string) {
  const filePath = path.resolve(__dirname, imagePath)
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString('base64'),
      mimeType,
    },
  }
}

// Generate Content
export const generateContent = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const result = await model.generateContent(prompt)
  return result.response.text()
}

//bimodal chat
export const bimodalChat = async (
  prompt: string,
  image: string,
  mimeType: string,
) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const mediaPath = '../uploads/'
  const imagePart = fileToGenerativePart(mediaPath + image, mimeType)

  const result = await model.generateContent([prompt, imagePart])
  console.log(result.response.text())
}

//normal chat with long context
//chat history
let chatHistory: ChatHistory[] = []

export const normalChat = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const chat = model.startChat({
    history: chatHistory,
  })
  let result = await chat.sendMessage(prompt)
  //push user history
  chatHistory.push({
    role: 'user',
    parts: [{ text: prompt }],
  })
  //push AI history
  chatHistory.push({
    role: 'model',
    parts: [{ text: result.response.text() }],
  })
  return result.response.text()
}
