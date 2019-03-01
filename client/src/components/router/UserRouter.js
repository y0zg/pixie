import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoMatch from '../layout/NoMatch';

import UserList from '../user/UserList';

export default function UserRouter() {
  return (
    <Switch>
      <Route exact path="/" component={UserList} />
      <Route component={NoMatch} />
    </Switch>
  );
}
