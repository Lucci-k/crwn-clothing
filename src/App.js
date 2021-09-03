import React from 'react';
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/homepage.component';

function App() {
  return (
    <div>
      <Route>
        <Switch>
          <HomePage path='/' component={HomePage} />
        </Switch>
      </Route>
    </div>
  );
}

export default App;
