import Product from "../../src/models/Product";
import { user1 } from "./users";

import { ObjectId } from 'mongodb';

export const product1 = new Product({
  title: "product 1",
  price: 150,
  sellerId: user1._id,
  categories: new ObjectId(),
  reviews: new ObjectId(),
  image: "https://i.picsum.photos/id/260/200/200.jpg?hmac=Nu9V4Ixqq3HiFhfkcsL5mNRZAZyEHG2jotmiiMRdxGA"
})

export const product2 = new Product({
  title: "product 2",
  price: 200,
  sellerId: user1._id,
  categories: new ObjectId(),
  reviews: new ObjectId(),
  image: "https://i.picsum.photos/id/260/200/200.jpg?hmac=Nu9V4Ixqq3HiFhfkcsL5mNRZAZyEHG2jotmiiMRdxGA"
})

export const product3 = new Product({
  title: "product 3",
  price: 100,
  sellerId: user1._id,
  categories: new ObjectId(),
  reviews: new ObjectId(),
  image: "https://i.picsum.photos/id/260/200/200.jpg?hmac=Nu9V4Ixqq3HiFhfkcsL5mNRZAZyEHG2jotmiiMRdxGA"
})

export const product4 = new Product({
  title: "product 4",
  price: 500,
  sellerId: user1._id,
  categories: new ObjectId(),
  reviews: new ObjectId(),
  image: "https://i.picsum.photos/id/260/200/200.jpg?hmac=Nu9V4Ixqq3HiFhfkcsL5mNRZAZyEHG2jotmiiMRdxGA"
})