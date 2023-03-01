import e from 'express'
import { ObjectId } from 'mongoose'
import { NotFoundError } from '../helpers/apiError'
import Cart, { CartDocument, ProductInCart } from '../models/Cart'
// import paymentService from './paymentService'

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

    // check if product already exists in the cart
    const existingProductIndex = getProductIndex(existingCart.products, productId)

    // if such a product is already in the cart - update its quantity
    // otherwise just add this product to products array
    if (existingProductIndex >= 0) {
      existingCart.products[existingProductIndex].quantity = quantity
    } else {
      existingCart.products.push({productId: productId, quantity: quantity})
    }
    await existingCart.save()
    return existingCart
  } else {
    const newCart = new Cart({userId: userId, products: cartItem})
    await newCart.save()
    return newCart
  }
}

const findAll = async () => {
  return await Cart.find()
}

const findById = async (id: string) => {
  const foundOne = await Cart.findById(id)
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
  findById,
  updateOne,
  deleteOne,
}
