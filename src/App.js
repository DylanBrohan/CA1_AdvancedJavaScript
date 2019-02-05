import React, { Component } from "react";
// Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import TrackDetails from "./componants/TrackDetails";

import Home from "./Home";

// ---Main Router File---
class App extends Component {
  render() {
    return (
      // Sets up route components & paths
      <Router>
        <Switch>
          {/* Routes */}
          <Route exact path="/" component={Home} />
          <Route exact path="/callback" component={Home} />
          <Route exact path="/trackDetails" component={TrackDetails} />
        </Switch>
      </Router>
    );
  }
}

export default App;
