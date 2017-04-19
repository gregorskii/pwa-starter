import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange500 } from 'material-ui/styles/colors';

import 'styles/base.global.scss';

import Header from 'components/header';
import Footer from 'components/footer';
import serviceWorker from 'components/service-worker';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

const App = ({ children }) => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  children: PropTypes.node
};

App.defaultProps = {
  children: null
};

export default serviceWorker(App);
