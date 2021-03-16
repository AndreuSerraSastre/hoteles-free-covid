import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Home from "../pages/Home";
import Recomended from "../pages/Recomended";

class Main extends Component {

  render() {
    console.log("object");
    return (
      <div>
        <Switch key="app-router-switch">
          <Route path="/Recomended" exact><Recomended></Recomended></Route>
          <Route path="*" exact><Home></Home></Route>
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