import { ObjectId } from 'mongoose'

export interface ProductUpdate {
  title?: string
  description?: string
  price?: number
  categories?: ObjectId[]
}

export interface UpdateFields {
  $set: Partial<ProductUpdate>
}
