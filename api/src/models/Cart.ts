import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export interface ItemInCart {
  cartItemDetails: ObjectId
  quantity: number
}

export interface CartDocument extends Document {
  userId: ObjectId | string
  cartItems: {
    cartItemDetails: ObjectId
    quantity: number
  }[]
  // status: 'paid' | 'unpaid'
}

const CartSchema = new Schema<CartDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  cartItems: [
    {
      cartItemDetails: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
      },
    },
  ],
  // status: {
  //   type: String,
  //   enum: ['paid', 'unpaid'],
  // },
})

const Cart = mongoose.model<CartDocument>('Cart', CartSchema)
export default Cart
