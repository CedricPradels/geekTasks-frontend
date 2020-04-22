import React from "react";
import "./components/_default/reset.css";
import "./components/_default/variables.css";
import "./components/_default/default.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Contexts from "./pages/Contexts";
import Filter from "./pages/Filter";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Header from "./components/organisms/Header";

import cookies from "./helpers/cookies";

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <PrivateRoute path="/tasks">
            <Tasks />
          </PrivateRoute>
          <PrivateRoute path="/contexts">
            <Contexts />
          </PrivateRoute>
          <PrivateRoute path="/projects">
            <Projects />
          </PrivateRoute>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <PrivateRoute path="/">
            <Filter />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

const PrivateRoute = ({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) => {
  return (
    <Route to={path}>
      {cookies.get("geekTasksToken") ? children : <Redirect to="/signin" />}
    </Route>
  );
};
