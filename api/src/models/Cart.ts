import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export interface CartDocument extends Document {
  userId: ObjectId
  products: [
    {
      productId: ObjectId
      quantity: number
    }
  ]
}

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      productId: Schema.Types.ObjectId,
      ref: 'Product',
      quantity: Number,
    },
  ],
})

const Cart = mongoose.model<CartDocument>('Cart', CartSchema)
export default Cart
