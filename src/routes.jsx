import React from 'react';
import {
  Route,
  BrowserRouter,
  Switch
} from 'react-router-dom';

import App from 'components/app';
import Home from 'pages/home';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </App>
    </BrowserRouter>
  );
};

export default AppRouter;
