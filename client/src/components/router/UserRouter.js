import React from 'react';
import { Route } from 'react-router-dom';

import UserList from '../user/UserList';

export default function UserRouter() {
  return <Route path="/" component={UserList} />;
}
