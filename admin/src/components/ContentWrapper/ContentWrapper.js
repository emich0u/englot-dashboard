import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import TopBar from "./TopBar";
import SideBar from "../SideBar";
import PageContent from "./pageContent/PageContent";
import Footer from "./Footer";
import Form from "./AddItem/Form";
import Products from "./Products/Products";
import Login from "./Login";
import PrivateRoute from "../common/PrivateRoute";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";

class ContainWrapper extends Component {
  render() {
    return (
      <BrowserRouter>
        <SideBar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBar />

            <Switch>
              <PrivateRoute path="/products" component={Products} />
            </Switch>
            <Switch>
              <PrivateRoute path="/addProduct" component={Form} />
            </Switch>
            <Switch>
              <PrivateRoute path="/dashboard" component={PageContent} />
            </Switch>
            <Switch>
              <PrivateRoute path="/user" component={Profiles} />
            </Switch>

            <PrivateRoute path="/profile/:handle" component={Profile} />

            <Route exact path="/" component={Login} />
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default ContainWrapper;
