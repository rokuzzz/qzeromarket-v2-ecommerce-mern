import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export interface ItemInFavorites {
  favoriteItem: ObjectId
}

export interface FavoritesDocument extends Document {
  associatedUser: ObjectId | string
  favoritesItems: ItemInFavorites[]
}

const FavoritesSchema = new Schema<FavoritesDocument>({
  associatedUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  favoritesItems: [
    {
      favoriteItem: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
})

const Favorites = mongoose.model<FavoritesDocument>(
  'Favorites',
  FavoritesSchema
)
export default Favorites
