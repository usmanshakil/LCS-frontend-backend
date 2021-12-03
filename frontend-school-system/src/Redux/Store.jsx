
import appReducer from './Reducers';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { createStore, applyMiddleware, compose, } from 'redux';
import createSagaMiddleware from 'redux-saga';

const persistConfig = {
    key: 'School_House-1',
    storage,
};



export default () => {
    const persistedReducer = persistReducer(persistConfig, appReducer);
    const sagaMiddleware = createSagaMiddleware();

    let store = compose(applyMiddleware(sagaMiddleware))(createStore)(persistedReducer);
    let persistor = persistStore(store);

    return { store, persistor, sagaMiddleware }

}
