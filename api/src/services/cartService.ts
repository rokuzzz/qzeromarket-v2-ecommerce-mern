import e from 'express'
import { ObjectId } from 'mongoose'
import { BadRequestError, NotFoundError } from '../helpers/apiError'
import Cart, { CartDocument, ProductInCart } from '../models/Cart'
// import paymentService from './paymentService'

// a function that CREATES a cart, ADDS new products to the cart (if the cart already exists), and additionally UPDATES existing products in the cart
const addToCart = async (cartItem: ProductInCart, userId: ObjectId) => {

  const {productId, quantity} = cartItem

  // check if cart exists for this user
  let existingCart = await Cart.findOne({userId: userId})

  function getProductIndex (products: ProductInCart[], id: ObjectId ) {
    let index = -1 
    for (let i = 0; i < products.length; i++) {
      if (products[i].productId.toString() === id.toString()) {
        index = i
        break
      }
    }
    return index
  }

  if (existingCart) {

    // returns -1 if the product is new and the product index if it already exists
    const existingProductIndex = getProductIndex(existingCart.products, productId)

    // if such a product is already in the cart - update its quantity
    // otherwise just add this product to products array
    if (existingProductIndex >= 0) {
      // if the user reduces the quantity of the product to 0 (or less than zero) - remove the product from the cart
      if (quantity <= 0) {
        existingCart.products.splice(existingProductIndex, 1)
        
        return await Cart.findByIdAndUpdate(
          existingCart._id,
          {
            $set: {products: existingCart.products}
          },
          {new: true}
        )
        .populate({ path: 'userId', select: '_id username' })
        .populate({path: 'products.productId', select: '_id title description price' })
      }

      existingCart.products[existingProductIndex].quantity = quantity
    } else {
      // prevent adding product with zero or negative quantity
      if (quantity <= 0) throw new BadRequestError('You are trying to add a product with zero or negative quantity')

      existingCart.products.push({productId: productId, quantity: quantity})
    }
    return await Cart.findByIdAndUpdate(
      existingCart._id,
      {
        $set: {products: existingCart.products}
      },
      {new: true}
    )
    .populate({ path: 'userId', select: '_id username' })
    .populate({path: 'products.productId', select: '_id title description price' })
  } else {
    const newCart = new Cart({userId: userId, products: cartItem})
    await newCart.save()
    return Cart.findById(newCart._id)
    .populate({ path: 'userId', select: '_id username' })
    .populate({path: 'products.productId', select: '_id title description price' })
  }
}

const findAll = async () => {
  return await Cart.find()
}

const findByCondition = async (id: string) => {
  const foundOne = await Cart.findOne({userId: id})
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const updateOne = async (id: string, update: Partial<CartDocument>) => {
  const foundOne = await Cart.findByIdAndUpdate(id, update)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const foundOne = await Cart.findByIdAndDelete(id)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

// const checkoutCart = async (cartId: string) => {
//   const cart = await Cart.findById(cartId)

//   if(cart) {
//     const checkoutSession = await paymentService.session(cart)
//   }
// }

export default {
  addToCart,
  findAll,
  findByCondition,
  updateOne,
  deleteOne,
}
