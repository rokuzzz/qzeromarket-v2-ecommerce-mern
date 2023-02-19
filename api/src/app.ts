import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import userRoute from './routes/userRoute'
import authRoute from './routes/authRoute'
import productRoute from './routes/productRoute'
import categoryRoute from './routes/categoryRoute'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())

// Set up routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/categories', categoryRoute)

// Custom API error handler
app.use(apiErrorHandler)

export default app
