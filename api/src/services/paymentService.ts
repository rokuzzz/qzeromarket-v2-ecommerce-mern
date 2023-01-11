// 3 strategies

/* 
- checkout api --> checkout session 
- charge api --> 
- paymentIntent --> 
*/

import { CartDocument } from "../models/Cart";
import Stripe from "stripe";
import userService from "./userService";

const stripe = new Stripe(
  'sk_test_51MP86OBLDI0w45Cm6YqyuiXcACKVGklQ5nrjkPsC6ldTCnNT2Vvdlzoqx90wLmdDmA1fyoe9UbCHKFApX6fdOJIc 00YvQJ3pil',
  {
    apiVersion: '2022-11-15'
  }
)

const createCustomer = async (email: string) => {
  return await stripe.customers.create({email: email})
}

export const session = async (cart: CartDocument) => {
  const user = await userService.getById(String(cart.userId))
  const customer = await createCustomer(user.email)
  await stripe.checkout.sessions.create({
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: ''
          },
          unit_amount: 1000 // price of 1 unit in cents
        },
        quantity: 10
      }
    ],
    mode: 'payment',
    customer: customer.id //customerId of a real stripe customer
  });
}