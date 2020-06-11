import React from 'react';
import { Router } from 'react-router';
import NavBar from 'components/layout/Navigation';
import MainContent from 'components/layout/Main';
import { createBrowserHistory } from 'history';
import RootRoutes from './RootRoutes';

const history = createBrowserHistory(); 

export default function App() {
  return (
    <Router history={history}>
      <NavBar />
      <MainContent>
        <RootRoutes />
      </MainContent>
    </Router>
  );
}
