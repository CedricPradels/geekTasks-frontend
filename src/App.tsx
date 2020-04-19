import React from "react";
import "./components/_default/reset.css";
import "./components/_default/variables.css";
import "./components/_default/default.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Contexts from "./pages/Contexts";
import Filter from "./pages/Filter";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Header from "./components/organisms/Header";

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/contexts">
            <Contexts />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/">
            <Filter />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
