import React, { Component } from "react";

import Aux from "../Auxiliary/Auxiliary";
import Classes from "./Layout.css";
import Toolbar from "../../components/UI/Navigation/Tootbar/Toolbar";
import SideDrawer from "../../components/UI/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: true
  };

  SideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.SideDrawerClosedHandler}
        />
        <main className={Classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
