import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PixieRouter from './PixieRouter';
import UserRouter from './UserRouter';
import NoMatch from './../layout/NoMatch';

export default function Router() {
  return (
    <Switch>
      <Route path="/users" component={UserRouter} />
      <Route path="/" component={PixieRouter} />
      <Route component={NoMatch} />
    </Switch>
  );
}
