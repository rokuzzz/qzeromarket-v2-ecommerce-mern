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
import { ObjectId } from 'mongoose'

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

const DEFAULT_PAGE = 0
const DEFAULT_LIMIT = 10
const DEFAULT_SORT = 'random'
const DEFAULT_ORDER = 0

const parseRequestParameters = (req: Request) => {
  const page = parseInt(req.query.page as string) || DEFAULT_PAGE
  const limit = parseInt(req.query.limit as string) || DEFAULT_LIMIT
  const sort = req.query.sort?.toString() || DEFAULT_SORT
  const order = req.query.order?.toString() || DEFAULT_ORDER

  return { page, limit, sort, order }
}

const convertCategories = (categories: any): string[] => {
  const convertedCategories: string[] = []

  if (Array.isArray(categories)) {
    for (const category of categories) {
      convertedCategories.push(
        typeof category !== 'string' ? category.toString() : category
      )
    }
  } else if (typeof categories === 'string' && categories !== '') {
    convertedCategories.push(categories)
  } else {
    convertedCategories.push('All')
  }

  return convertedCategories
}

const getCategoryIds = async (categories: any) => {
  const convertedCategories = convertCategories(categories)
  const categoryIds = await categoryService.getIdsByNames(convertedCategories)

  return categoryIds
}

const fetchProducts = async (
  page: number,
  limit: number,
  sort: string,
  order: string | number,
  categoryIds: ObjectId[]
) => {
  const products = await productService.findAllPipeline(
    page,
    limit,
    sort,
    order,
    categoryIds
  )

  return products
}

const addSignedUrlsToProducts = async (products: any[]) => {
  const productsWithUrls = []

  for (const product of products) {
    product.imageUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({ Bucket: BUCKET_NAME, Key: product.imageName }),
      { expiresIn: 3600 }
    )
    productsWithUrls.push(product)
  }

  return productsWithUrls
}

const getFilteredProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, sort, order } = parseRequestParameters(req)

    const categories = req.query.categories
    const categoryIds = await getCategoryIds(categories)

    const products = await fetchProducts(page, limit, sort, order, categoryIds)
    const productsWithUrls = await addSignedUrlsToProducts(products)

    res.status(200).json(productsWithUrls)
  } catch (err) {
    next(err)
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
