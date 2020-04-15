import {put} from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* purchaseBurgerSaga (action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth='+action.token,action.orderData);
        yield put(actions.purchaseBurgerSucess(response.data.name, action.orderData))
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrderSaga (action) {
    yield put(actions.fetchOrderStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/orders.json' + queryParams);
        const fetchOrder = [];
        // Turn the returned Object into an array
        for (let key in response.data) {
          fetchOrder.push({
            ...response.data[key],
            id:key
          });
        }
        yield put(actions.fetchOrderSuccess(fetchOrder));
    } catch (err) {
        yield put(actions.fetchOrderFail(err));
    }
}