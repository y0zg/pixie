import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PixieIndex from '../pixie/PixieIndex';
import PixieEdit from '../pixie/PixieEdit';
import PixieCreate from '../pixie/PixieCreate';
import UserIndex from '../user/UserIndex';

const Router = () => {
  return (
    <Switch>
      <Route path="/users" component={UserIndex} />
      <Route path="/create" component={PixieCreate} />
      <Route path="/:id" component={PixieEdit} />
      <Route path="/" component={PixieIndex} />
    </Switch>
  );
};

export default Router;
