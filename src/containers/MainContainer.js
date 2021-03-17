import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Home from "../pages/Home";
import Recomended from "../pages/Recomended";

class Main extends Component {

  render() {
    return (
      <div>
        <Switch key="app-router-switch">
          <Route path="/Recomended" exact><Recomended></Recomended></Route>
          <Route path="/Recomended/:id" exact component={(props) => <Recomended id={props.match.params.id}></Recomended>} />
          <Route path="*/:id" exact component={(props) => <Home id={props.match.params.id}></Home>} key="app-router-Home" />
          <Route path="*" exact component={(props) => <Home></Home>} key="app-router-Home" />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => (
  {

  });

const mapDispatchToProps = ({});
const MainConnected = connect(mapStateToProps, mapDispatchToProps)(Main);
export default withRouter(MainConnected);