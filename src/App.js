import React, { Component } from "react";
import store, { loadClients, loadSkills } from "./store";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import Clients_All from "./Clients_All";
import Skills_All from "./Skills_All";
import Client_Single from "./Client_Single";
import Skill_Single from "./Skill_Single";

class App extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  async componentDidMount() {
    store.dispatch(loadClients());
    store.dispatch(loadSkills());

    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //     store.subscribe(() => this.setState(store.getState()));
  //   }
  // }

  componentWillMount() {
    store.subscribe(() => this.setState(store.getState()));
  }

  render() {
    return (
      <Router>
        <h1>Acme Talent Agency</h1>

        <div className="home-cont">
          <Route component={Clients_All} path="/" exact />
          <Route component={Skills_All} path="/" exact />
          <Route component={Client_Single} path="/clients/:id" exact />
          <Route component={Skill_Single} path="/skills/:id" exact />
        </div>
      </Router>
    );
  }
}

export default connect((state) => state)(App);
