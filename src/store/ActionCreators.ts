import { DispatchType, FavoriteAction } from "../type";
import IFavorite from "../types/Favorite";
import * as actionTypes from "./ActionTypes";

export function AddFavorite(favorite: IFavorite) {
  const action: FavoriteAction = {
    type: actionTypes.ADD_FAVORITE,
    favorite,
  };
  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}

export function RemoveFavorite() {
    const action: FavoriteAction = {
      type: actionTypes.REMOVE_FAVORITE,
      favorite:undefined,
    };
    return (dispatch: DispatchType) => {
      dispatch(action);
    };
  }