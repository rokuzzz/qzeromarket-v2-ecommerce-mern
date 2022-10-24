import { ObjectId } from 'mongodb';

import User from "../../src/models/User";

export const user1 = new User({
  firstname: "Roman", 
  lastname: "Kuzero",
  username: "romanku",
  email: "roman.kuzero@email.com",
  password: "123",
  address: new ObjectId(),
  reviews: new ObjectId()
})

export const user2 = new User({
  firstname: "John", 
  lastname: "Doe",
  username: "johndoe",
  email: "john.doe@email.com",
  password: "321",
  address: new ObjectId(),
  reviews: new ObjectId()
})