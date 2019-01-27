import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PixieCreate from '../pixie/PixieCreate';
import PixieGallery from '../pixie/PixieGallery';
import PixieEdit from '../pixie/PixieEdit';

export default function PixieRouter() {
  return (
    <Switch>
      <Route path="/create" component={PixieCreate} />
      <Route path="/edit/:id" component={PixieEdit} />
      <Route path="/" component={PixieGallery} />
    </Switch>
  );
}
