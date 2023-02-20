import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export interface ProductDocument extends Document {
  title: string
  description: string
  price: number
  // sellerId: ObjectId
  categories: ObjectId[]
  // reviews: ObjectId[]
  image: string
}

const ProductSchema = new Schema<ProductDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
    },
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }],
    // categories: {
    //   type: Array,
    //   required: true
    // },
    // sellerId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User'
    // },
    image: {
      type: String
    }
  },
  // {
  //   toJSON: {
  //     virtuals: true
  //   },
  //   toObject: {
  //     virtuals: true
  //   }
  // }
)

// ProductSchema.virtual('reviews', {
//   ref: 'ProductReview',
//   localField: '_id',
//   foreignField: 'productId',
// })

const Product = mongoose.model<ProductDocument>('Product', ProductSchema)
export default Product
