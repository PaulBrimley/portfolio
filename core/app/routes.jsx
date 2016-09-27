import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './components/app';
import MainView from './components/main.jsx';
import ManageProjects from './components/manageProjects';

export default (
    <Route path='/' component={App}>
      <IndexRoute component={MainView} />
      <Route path='manage' component={ManageProjects} />
    </Route>
);