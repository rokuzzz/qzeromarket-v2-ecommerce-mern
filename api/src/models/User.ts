import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export type UserRole = "guest" | "admin";

export interface UserDocument extends Document {
  _doc?: any
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  role: UserRole
  // address: ObjectId[]
  // reviews: ObjectId[]
}

const UserSchema = new Schema<UserDocument>({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['guest', 'admin'],
    required: true
  }
  // address: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'Address',
  //     required: true
  // }],
  // reviews: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'UserReview',
  //     required: true
  // }],
})

const User = mongoose.model<UserDocument>('User', UserSchema)
export default User
