import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import Login from "./login";
import Register from "./register";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Root extends React.Component {
  render(){
    return (
      <Router>
        <Switch>
            <Route path = "/App/:username/:id" component = {App} />;
          <Route exact path="/" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
        </Router>
    );
  }
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();
