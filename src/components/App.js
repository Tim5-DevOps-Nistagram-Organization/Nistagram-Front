import "./App.css";
import { Switch } from "react-router-dom";
import Header from "./common/Header";
import GuardedRoute from "./GuardedRoute";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Role from "../model/Role";
import PageNotFound from "./PageNotFound";
import Registration from "./registration/Registration";
import Login from "./login/Login";
import Search from "./search/Search";
import EditProfile from "./profile/edit/EditProfile";
import ViewProfile from "./profile/view/ViewProfile";
import PostAdd from "./post/add/PostAdd";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <GuardedRoute
          exact
          path="/"
          component={Search}
          roles={[
            Role.UNLOGGED,
            Role.ROLE_REGULAR,
            Role.ROLE_AGENT,
            Role.ROLE_ADMIN,
          ]}
          redirect="/login"
        />
        <GuardedRoute
          path="/profile/edit"
          component={EditProfile}
          roles={[Role.ROLE_REGULAR, Role.ROLE_AGENT]}
          redirect="/login"
        />
        <GuardedRoute
          path="/profile/view/:username"
          component={ViewProfile}
          roles={[
            Role.UNLOGGED,
            Role.ROLE_REGULAR,
            Role.ROLE_AGENT,
            Role.ROLE_ADMIN,
          ]}
          redirect="/"
        />
        <GuardedRoute
          path="/profile/view"
          component={ViewProfile}
          roles={[Role.ROLE_REGULAR, Role.ROLE_AGENT]}
          redirect="/login"
        />
        <GuardedRoute
          path="/post/add"
          component={PostAdd}
          roles={[Role.ROLE_REGULAR, Role.ROLE_AGENT]}
          redirect="/login"
        />
        <GuardedRoute
          exact
          path="/registration"
          roles={[Role.UNLOGGED]}
          component={Registration}
          redirect="/"
        />
        <GuardedRoute
          exact
          path="/login"
          roles={[Role.UNLOGGED]}
          component={Login}
          redirect="/"
        />
        <GuardedRoute component={PageNotFound} redirect="/" />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
