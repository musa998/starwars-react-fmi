import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Films from 'pages/Films';
import People from 'pages/People';

function RootRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Films} />
      <Route exact path="/films" component={Films} />
      <Route exact path="/people" component={People} />

    </Switch>
  );
}
export default RootRoutes;