import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './configureStore';
import App from './components/app';

export default class Host extends Component { // eslint-disable-line
  render() {
    return (
      <Provider store={configureStore()}>
        <App />
      </Provider>
    );
  }
}
