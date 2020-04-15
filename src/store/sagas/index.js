import {takeEvery} from 'redux-saga/effects';


import * as actionTypes from '../actions/actionType';
import {logoutSaga, checkAuthTimeOutSaga, authUserSaga, authCheckStateSaga} from './auth';
import {initIngredientsSaga} from './burgerBuilder';
import {purchaseBurgerSaga,fetchOrderSaga} from './order';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeOutSaga)
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrderSaga() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDER, fetchOrderSaga);
}