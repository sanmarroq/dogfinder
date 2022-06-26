import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { createStore, applyMiddleware, Store } from "redux"
import thunk from "redux-thunk"
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import { DispatchType, FavoriteAction, FavoriteState } from './type';
import reducer from './store/Reducer';

const store: Store<FavoriteState, FavoriteAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  <React.StrictMode>
     <App />
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
