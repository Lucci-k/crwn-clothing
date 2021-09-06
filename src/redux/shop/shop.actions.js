import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshopToMap } from '../../firebase/firebase.utils';
import { collection, query, getDocs } from 'firebase/firestore';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});
export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return async (dispatch) => {
    const q = query(collection(firestore, 'collections'));
    dispatch(fetchCollectionsStart());
    try {
      const querySnapshot = await getDocs(q);
      const collectionsMap = convertCollectionsSnapshopToMap(querySnapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    } catch (err) {
      dispatch(fetchCollectionsFailure(err.message));
    }
  };
};
