import React, { Component } from 'react';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate';

export default (ComposedComponent) => {
  class ServiceWorkerComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        logs: [],
      };
    }

    componentDidMount() {
      this.pushLog('the main JS thread was loaded');

      if ('serviceWorker' in navigator && (window.location.protocol === 'https:' ||
        window.location.hostname === 'localhost')
      ) {
        const registration = runtime.register();

        registerEvents(registration, {
          onInstalled: () => {
            this.pushLog('onInstalled');
          },
          onUpdateReady: () => {
            this.pushLog('onUpdateReady');
          },
          onUpdating: () => {
            this.pushLog('onUpdating');
          },
          onUpdateFailed: () => {
            this.pushLog('onUpdateFailed');
          },
          onUpdated: () => {
            this.pushLog('onUpdated');
          }
        });
      } else {
        this.pushLog('serviceWorker not available');
      }
    }

    pushLog(log) {
      this.setState({
        logs: [
          ...this.state.logs,
          log
        ]
      });
    }

    handleClickReload = (event) => {
      event.preventDefault();

      applyUpdate().then(() => {
        window.location.reload();
      });
    };

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  };

  return ServiceWorkerComponent;
}
