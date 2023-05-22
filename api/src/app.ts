import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'
import cors from 'cors'

import apiErrorHandler from './middlewares/apiErrorHandler'
import userRoute from './routes/userRoute'
import authRoute from './routes/authRoute'
import productRoute from './routes/productRoute'
import categoryRoute from './routes/categoryRoute'
import cartRoute from './routes/cartRoute'
import favoritesRoute from './routes/favoritesRoute'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
// app.use(apiContentType)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.text())

// Enable All CORS Requests
app.use(cors())

// Set up routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/carts', cartRoute)
app.use('/api/favorites', favoritesRoute)

// Custom API error handler
app.use(apiErrorHandler)

export default app
