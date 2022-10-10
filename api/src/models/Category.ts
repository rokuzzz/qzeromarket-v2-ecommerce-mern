import mongoose, { Document, Schema } from "mongoose";

export interface CategoryDocument extends Document{
  name: string
}

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
})

const Category = mongoose.model<CategoryDocument>('Category', CategorySchema)
export default Category