import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

export default (initialState) => {
  const store = createStore(reducers, initialState, applyMiddleware(thunk));
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default); // eslint-disable-line
    });
  }

  return store;
};
