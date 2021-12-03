import { takeLatest } from 'redux-saga/effects';

import {  saveLoginUserInfo } from './Login';

export default function* rootSaga() {

    yield takeLatest('LOGIN_USER_INFO', saveLoginUserInfo)

}