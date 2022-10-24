import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export interface UserDocument extends Document {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  address: ObjectId[]
  reviews: ObjectId[]
}

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'UserReview',
      required: true,
    },
  ],
})

const User = mongoose.model<UserDocument>('User', UserSchema)
export default User
