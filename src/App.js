import React, { Component } from "react";
import store from "./store";
import { connect } from "react-redux";
// import { HashRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  async componentDidMount() {
    // store.dispatch(loadLeagues());

    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => state;

// const mapDispatchToProps = (dispatch) => {
//   return {
//     selectATeam: (id) => {
//       dispatch(selectTeam(id));
//     },
//   };
// };

export default connect(mapStateToProps)(App);

//router language below:

// render() {
//   return (
//     <Router>
//       <div>
//         <h1>Acme Users</h1>
//         <Route component={Nav} />
//         <Route component={Users} path="/users" exact />
//         <Route component={User} path="/users/:id" exact />
//       </div>
//     </Router>
//   );
// }

// const Nav = ({create, users, location: {pathname}}) => {
//   return (
//       <nav>
//         <Link to='/' className={pathname === '/' ? 'selected' : ''}>Home</Link>
//         <Link to='/users' className={pathname === '/users' ? 'selected' : ''}>Users ({users.length})</Link>
//         <button onClick={() => create(faker.name.firstName())}>Create</button>
//       </nav>
//   )

// }
