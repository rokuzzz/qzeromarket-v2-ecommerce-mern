export interface ItemInFavorites {
  _id: string,
  title: string,
  description: string,
  price: number
}

export interface FavoritesItem {
  _id: string,
  itemInFavorites: ItemInFavorites
}

export interface Favorites {
  _id: string,
  favoritesItems: FavoritesItem[],
}

export interface FavoritesSliceState {
  usersFavorites?: Favorites
}