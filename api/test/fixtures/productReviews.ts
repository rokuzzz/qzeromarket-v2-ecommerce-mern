import { product1 } from './products';
import ProductReview from "../../src/models/ProductReview";
import { user1, user2 } from "./users";

export const productReviews1 = new ProductReview({
  reviewerId: user1.id,
  productId: product1.id,
  rate: 4,
  comment: 'Good'
})

export const productReviews2 = new ProductReview({
  reviewerId: user2.id,
  productId: product1.id,
  rate: 3,
  comment: 'ok'
})