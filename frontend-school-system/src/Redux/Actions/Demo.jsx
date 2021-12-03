import { put } from 'redux-saga/effects'

export function* setNews(data) {
    try {
        // Dispatch Action To Redux Store
        yield put({
            type: 'SET_NEWS',
            value: data,
        });
    }
    catch (error) {
        console.log(error);
    }
};