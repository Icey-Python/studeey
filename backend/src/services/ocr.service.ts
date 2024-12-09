import { Logger } from 'borgen'
import { createWorker } from 'tesseract.js'

// Process Image Using OCR
export const processOCR = async (imagePath: string): Promise<string> => {
  try {
    const worker = await createWorker('eng')
    const result = await worker.recognize(imagePath)
    Logger.info({ message: `OCR result: ${result.data} ` })
    Logger.info({ message: 'OCR processing completed' })

    await worker.terminate()
    return result.data.text
  } catch (err) {
    Logger.error({ message: 'OCR processing failed: ' + err })
    throw new Error('Failed to process image using OCR.')
  }
}
