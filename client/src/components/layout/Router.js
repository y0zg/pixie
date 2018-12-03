import React from 'react';
import { Route } from 'react-router-dom';
import PixieIndex from '../pixie/PixieIndex';
import PixieEdit from '../pixie/PixieEdit';

const Router = () => {
  return (
    <>
      <Route exact path="/" component={PixieIndex} />
      <Route path="/:id" component={PixieEdit} />
    </>
  );
};

export default Router;
