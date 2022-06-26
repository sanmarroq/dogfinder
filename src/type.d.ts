import IFavorite from "./types/Favorite"

type FavoriteState = {
    favorite?: IFavorite
  }
  
  type FavoriteAction = {
    type: string
    favorite: IFavorite
  }

    
  type DispatchType = (args: FavoriteAction) => FavoriteAction