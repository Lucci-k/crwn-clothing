import { takeLatest, call, put } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshopToMap } from '../../firebase/firebase.utils';
import { collection, query, getDocs } from 'firebase/firestore';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  yield console.log('I am fired');

  try {
    const q = query(collection(firestore, 'collections'));
    const querySnapshot = yield getDocs(q);
    const collectionsMap = yield call(convertCollectionsSnapshopToMap, querySnapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (err) {
    put(fetchCollectionsFailure(err.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
