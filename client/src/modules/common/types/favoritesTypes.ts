export interface ItemInFavorites {
  _id: string;
  title: string;
  description: string;
  price: number;
}

export interface FavoritesItem {
  _id: string;
  itemInFavorites: ItemInFavorites;
}

export interface Favorites {
  _id: string;
  favoritesItems: FavoritesItem[];
}

export interface FavoritesSliceState {
  usersFavorites?: {
    data: Favorites;
    isLoading: boolean;
    error?: string;
  };
  allFavorites?: {
    data: Favorites[];
    isLoading: boolean;
    error?: string;
  };
}

export type token = string

export interface GetUsersFavoritesProps {
  userId: string;
  token: token;
}

export interface ModifyFavoritesProps {
  title: string;
  token: token;
}

export interface GetAllFavoritesProps {
  token: token;
}

export interface DeleteFavoritesProps {
  id: string;
  token: token;
}
