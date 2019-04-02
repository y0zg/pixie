import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PixieCreate from '../pixie/PixieCreate';
import PixieGallery from '../pixie/PixieGallery';
import PixieEdit from '../pixie/PixieEdit';
import NoMatch from '../layout/NoMatch';

export default function PixieRouter() {
  return (
    <Switch>
      <Route exact path="/create" component={PixieCreate} />
      <Route exact path="/edit/:id" component={PixieEdit} />
      <Route exact path="/" component={PixieGallery} />
      <Route component={NoMatch} />
    </Switch>
  );
}
