import { FavoriteAction, FavoriteState } from "../type"
import IFavorite from "../types/Favorite"
import * as actionTypes from "./ActionTypes"

const initialState: FavoriteState = {
favorite:{
    breed:"",
    variant:""
}
}
const reducer = (
    state: FavoriteState = initialState,
    action: FavoriteAction
  ): FavoriteState => {
    switch (action.type) {
      case actionTypes.ADD_FAVORITE:
        const newFavorite: IFavorite = {
          breed: action.favorite!.breed,
          variant: action.favorite!.variant
        }
        return {
          ...state,
          favorite: newFavorite,
        }
      case actionTypes.REMOVE_FAVORITE:
       
        return {
          ...state,
          favorite: undefined,
        }
    }
    return state
  }
  
  export default reducer