import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { render } from 'react-dom';

import { Provider } from 'react-redux';
//redux to get appredux on page refreash 
import { PersistGate } from 'redux-persist/integration/react';
import store from './Redux/Store';


import rootSaga from '././Redux/Actions';


store().sagaMiddleware.run(rootSaga);

render(
  <Provider store={store().store}>
    <PersistGate loading={null} persistor={store().persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
