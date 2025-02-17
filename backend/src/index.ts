import express, { Application } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Logger } from 'borgen'
import { config } from './config/config'
import router from './routes/router'
import connectDb from './config/db.connect'

const app: Application = express()
const PORT = config.server.PORT || 3000


const corsOptions: cors.CorsOptions = {
  origin: config.origin,
  credentials: true,
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/ping', (_, res) => {
   res.send('pong')
})
app.use('/api', router)

const StartServer = () => {
  app.listen(PORT, () => {
    Logger.info({ message: `The server is listening on port ${PORT}` })
  })
}
connectDb(StartServer)

