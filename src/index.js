import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Store from './store/store';
import App from './App';
import User from './User';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={Store.store}>
    <PersistGate loading={null} persistor={Store.persistor}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/user/:username" component={User}/>
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>

  , document.getElementById('root'));