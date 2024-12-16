import 'dotenv/config'

const MONGO_URL = process.env.MONGO_URL || ''

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5500

const ORIGIN = process.env.ORIGIN || ''
const GENERATIVE_AI_API_KEY = process.env.GENERATIVE_AI_API_KEY || ''

export const config = {
    mongo: {
        URL: MONGO_URL
    },
    server: {
        PORT: SERVER_PORT
    },
    JWT_SECRET: process.env.JWT_SECRET || '',
    origin: ORIGIN,
    generativeAI: {
        API_KEY: GENERATIVE_AI_API_KEY
    }
}
