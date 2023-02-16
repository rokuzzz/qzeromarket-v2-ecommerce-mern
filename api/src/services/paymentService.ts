// // 3 strategies

// /* 
// - checkout api --> checkout session 
// - charge api --> 
// - paymentIntent --> 
// */

// import { CartDocument } from "../models/Cart";
// import Stripe from "stripe";
// import userService from "./userService";
// import productService from "./productService";

// const stripe = new Stripe(
//   'sk_test_51MP86OBLDI0w45Cm6YqyuiXcACKVGklQ5nrjkPsC6ldTCnNT2Vvdlzoqx90wLmdDmA1fyoe9UbCHKFApX6fdOJIc 00YvQJ3pil',
//   {
//     apiVersion: '2022-11-15'
//   }
// )

// const createCustomer = async (email: string) => {
//   return await stripe.customers.create({email: email})
// }

// const session = async (cart: CartDocument) => {
//   const user = await userService.getById(String(cart.userId))
//   const customer = await createCustomer(user.email)
//   const products = cart.products // {productId, quantity}[]
//   const checkoutProducts = products.map(
//     async (item) => {
//       const product = await productService.findById(String(item.productId))
//       return {       
//         price_data: {
//           currency: 'eur',
//           product_data: {
//             name: product.title
//           },
//           unit_amount: product.price // price of 1 unit in cents
//         },
//         quantity: item.quantity
//       }
//     }
//   )
//   return await stripe.checkout.sessions.create({
//     success_url: 'localhost:3000/check-out-success',
//     cancel_url: 'localhost:3000/check-out-failure',
//     line_items: [
//       // checkoutProducts
//     ],
//     mode: 'payment',
//     customer: customer.id //customerId of a real stripe customer
//   });
// }

// export default {
//   session
// }