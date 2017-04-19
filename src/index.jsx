import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppRouter from 'src/routes';
import store from 'src/store';
import 'src/manifest.json';

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.querySelector('.container')
);
