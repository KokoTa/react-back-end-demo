import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

import './index.css';

import Util from './lib/util'

import Wrap from './pages/Wrap'

// 全局功能对象
// 这里不使用 context，因为就算用了也需要写很多冗余的引入代码
// 这里不存放在 redux，过于麻烦，尤其是有多个 reducer 的情况下
window.Util = Util

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers())

function App() {
  return (
    <Wrap></Wrap>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root')
);
