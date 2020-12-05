import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import DetailsPage from './routes/DetailsPage';
import EditPage from './routes/EditPage';

export default function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/restaurants/:id" exact component={DetailsPage} />
        <Route path="/restaurants/:id/edit" exact component={EditPage} />
      </Switch>
    </div>
  );
}
