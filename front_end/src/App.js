import React from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import './App.css';
import Admin from "./layouts/Admin";

const hist = createBrowserHistory();
function App() {
  return (
      <Router history={hist}>
        <Route path="/" component={Admin} />
      </Router>
  );
}

export default App;
