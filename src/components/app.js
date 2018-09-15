import React from "react";
import { hot } from "react-hot-loader";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  render = () => {
    return (
      <div>
        <h1>Hello World!</h1>
        {/* <Switch>
          <Route exact path="/some-route" component={SomeComponent} />
        </Switch>
        <Redirect from="/" to="/some-route" /> */}
      </div>
    );
  };
}

export default hot(module)(App);
