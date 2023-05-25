import e from 'express'
import { ObjectId } from 'mongoose'
import { BadRequestError, NotFoundError } from '../helpers/apiError'
import Cart, { CartDocument, ItemInCart } from '../models/Cart'
// import paymentService from './paymentService'

// Function to find an item in the cart by its details (ID)
const findItemIndex = (cartItems: ItemInCart[], itemId: ObjectId): number => {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].cartItemDetails.toString() === itemId.toString()) {
      return i
    }
  }
  return -1
}

// Function to handle quantity updates and removing items from cart
const updateQuantityOrRemove = (
  cartItems: ItemInCart[],
  itemIndex: number,
  quantity: number
) => {
  if (quantity <= 0) {
    cartItems.splice(itemIndex, 1)
  } else {
    cartItems[itemIndex].quantity = quantity
  }
  return cartItems
}

// The main function to modify the cart
const handleCartItem = async (cartItem: ItemInCart, userId: ObjectId) => {
  const { cartItemDetails, quantity } = cartItem

  // Find an existing cart or create a new one
  const userCart =
    (await Cart.findOne({ associatedUser: userId })) ||
    new Cart({ associatedUser: userId, cartItems: [] })

  const itemIndex = findItemIndex(userCart.cartItems, cartItemDetails)

  // If the item exists in the cart, update its quantity or remove it
  // If it doesn't exist and quantity is positive, add it to the cart
  if (itemIndex >= 0) {
    userCart.cartItems = updateQuantityOrRemove(
      userCart.cartItems,
      itemIndex,
      quantity
    )
  } else if (quantity > 0) {
    userCart.cartItems.push({ cartItemDetails, quantity })
  } else {
    throw new BadRequestError(
      'You are trying to add a product with zero or negative quantity'
    )
  }

  await userCart.save()

  return Cart.findById(userCart._id)
    .populate({ path: 'associatedUser', select: '_id username' })
    .populate({
      path: 'cartItems.cartItemDetails',
      select: '_id title description price',
    })
}

const findAll = async () => {
  return await Cart.find()
    .populate({
      path: 'associatedUser',
      select: '_id username',
    })
    .populate({
      path: 'cartItems.cartItemDetails',
      select: '_id title description price',
    })
}

const findByCondition = async (id: string) => {
  const foundOne = await Cart.findOne({ associatedUser: id })
    .populate({
      path: 'associatedUser',
      select: '_id username',
    })
    .populate({
      path: 'cartItems.cartItemDetails',
      select: '_id title description price',
    })

  if (!foundOne) {
    throw new NotFoundError()
  }

  return foundOne
}

const updateOne = async (id: string, update: Partial<CartDocument>) => {
  const foundOne = await Cart.findByIdAndUpdate(id, update)

  if (!foundOne) {
    throw new NotFoundError()
  }

  return foundOne
}

const deleteOne = async (id: string) => {
  const foundOne = await Cart.findByIdAndDelete(id)

  if (!foundOne) {
    throw new NotFoundError()
  }

  return foundOne
}

// const checkoutCart = async (cartId: string) => {
//   const cart = await Cart.findById(cartId)

//   if(cart) {
//     const checkoutSession = await paymentService.session(cart)
//   }
// }

export default {
  handleCartItem,
  findAll,
  findByCondition,
  updateOne,
  deleteOne,
}
