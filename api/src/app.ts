import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())

// Set up routers

// Custom API error handler
app.use(apiErrorHandler)

export default app
