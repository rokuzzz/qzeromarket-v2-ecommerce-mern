import { NextFunction, Request, Response } from 'express'
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'
import sharp from 'sharp'

import productService from '../services/productService'
import categoryService from '../services/categoryService'
import Product from '../models/Product'
import {
  ACCESS_KEY,
  SECRET_ACCESS_KEY,
  BUCKET_REGION,
  BUCKET_NAME,
} from './../util/secrets'
import { ProductUpdate, UpdateFields } from 'productTypes'
import { BadRequestError } from '../helpers/apiError'

const s3 = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  region: BUCKET_REGION,
})

const generateRandomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex')

const resizeImage = async (buffer: Buffer) =>
  sharp(buffer).resize({ height: 800, width: 800, fit: 'contain' }).toBuffer()

const uploadImage = async (
  buffer: Buffer,
  imageName: string,
  mimetype: string
) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: imageName,
    Body: buffer,
    ContentType: mimetype,
  }

  const command = new PutObjectCommand(params)
  await s3.send(command)
}

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, price, categories } = req.body

    const categoryIds = await categoryService.getIdsByNames(categories)

    if (!req.file?.buffer) {
      throw new BadRequestError()
    }

    const imageName = generateRandomImageName()
    const resizedBuffer = await resizeImage(req.file?.buffer)

    await uploadImage(resizedBuffer, imageName, req.file?.mimetype)

    if (!title || !description || !price || categoryIds.length === 0) {
      throw new BadRequestError()
    } else {
      const newProduct = new Product({
        title: title,
        description: description,
        price: price,
        categories: categoryIds,
        imageName: imageName,
      })

      const savedProduct = await productService.createOne(newProduct)

      res.status(200).json(savedProduct)
    }
  } catch (err) {
    next(err)
  }
}

const getFilteredProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const skipPages = parseInt(req.query.page as string) || 0
  const limitPages = parseInt(req.query.limit as string) || 10
  const sortBy = req.query.sort?.toString() || 'random'
  const order = req.query.order?.toString() || 0
  let categories = req.query.categories

  const convertedCategories: string[] = []

  // check if categories value is an array
  if (Array.isArray(categories)) {
    // converts each category in the categories to a string (if it's not already)
    // push values to convertedCategories
    for (const category of categories) {
      if (typeof category !== 'string') {
        convertedCategories.push(category.toString())
      } else {
        convertedCategories.push(category)
      }
    }
    try {
      const categoryIds = await categoryService.getIdsByNames(
        convertedCategories
      )
      const products = await productService.findAllPipeline(
        skipPages,
        limitPages,
        sortBy,
        order,
        categoryIds
      )

      for (const product of products) {
        product.imageUrl = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: product.imageName,
          }),
          { expiresIn: 3600 }
        )
      }

      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
    // if category value is string and it is not empty - convert it to string array type
  } else if (typeof categories == 'string' && categories !== '') {
    convertedCategories.push(categories)
    try {
      const categoryIds = await categoryService.getIdsByNames(
        convertedCategories
      )
      // if the categoryIds value is an empty array - show all products
      if (categoryIds.length == 0) {
        categories = ['All']
        const categoryIds = await categoryService.getIdsByNames(categories)
        const products = await productService.findAllPipeline(
          skipPages,
          limitPages,
          sortBy,
          order,
          categoryIds
        )

        for (const product of products) {
          product.imageUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
              Bucket: BUCKET_NAME,
              Key: product.imageName,
            }),
            { expiresIn: 60 }
          )
        }

        res.status(200).json(products)
      } else {
        const products = await productService.findAllPipeline(
          skipPages,
          limitPages,
          sortBy,
          order,
          categoryIds
        )
        for (const product of products) {
          product.imageUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
              Bucket: BUCKET_NAME,
              Key: product.imageName,
            }),
            { expiresIn: 3600 }
          )
        }

        res.status(200).json(products)
      }
    } catch (err) {
      next(err)
    }
  } else {
    categories = ['All']
    try {
      const categoryIds = await categoryService.getIdsByNames(categories)
      const products = await productService.findAllPipeline(
        skipPages,
        limitPages,
        sortBy,
        order,
        categoryIds
      )
      for (const product of products) {
        product.imageUrl = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: product.imageName,
          }),
          { expiresIn: 3600 }
        )
      }

      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }
}

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const product = await productService.findById(id)

    const imageUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: product.imageName,
      }),
      { expiresIn: 3600 }
    )

    product.imageUrl = imageUrl

    res.status(200).json(product)
  } catch (err) {
    next(err)
  }
}

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { title, description, price, categories } = req.body

    const categoryIds = await categoryService.getIdsByNames(categories)

    let updateFields: UpdateFields = { $set: {} }

    if (categoryIds.length === 0) {
      updateFields = { $set: { title, description, price } }
    } else {
      updateFields = {
        $set: { categories: categoryIds, title, description, price },
      }
    }

    // Remove fields from the updateFields object if they are undefined in req.body
    Object.keys(updateFields.$set).forEach((key) => {
      if (updateFields.$set[key as keyof ProductUpdate] === undefined) {
        delete updateFields.$set[key as keyof ProductUpdate]
      }
    })

    const updatedProduct = await productService.updateOne(id, updateFields, {
      new: true,
    })

    res.status(200).json(updatedProduct)
  } catch (err) {
    next(err)
  }
}

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const product = await productService.findById(id)

    // Delete the product image from the S3 bucket
    const deleteParams = { Bucket: BUCKET_NAME, Key: product.imageName }
    await s3.send(new DeleteObjectCommand(deleteParams))

    // Delete the product from the database
    await productService.deleteOne(id)

    res.status(200).json('Product has been deleted.')
  } catch (err) {
    next(err)
  }
}

export default {
  createProduct,
  getProductById,
  getFilteredProducts,
  updateProduct,
  deleteProduct,
}
