import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ProductDocument extends Document{
  title: string,
  price: number,
  sellerId: ObjectId,
  categories: ObjectId[],
  reviews: ObjectId[],
  image: string
}

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'ProductReview'
  }],
  image: {
    type: String
  }

})

const Product = mongoose.model<ProductDocument>('Product', ProductSchema)
export default Product