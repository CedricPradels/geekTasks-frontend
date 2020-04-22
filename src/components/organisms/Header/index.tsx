import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./style.css";
import classNames from "classnames";

import cookies from "../../../helpers/cookies";
import { Zap, ZapOff } from "react-feather";

export default function Header() {
  const location = useLocation();
  const [navData, setNavData] = useState(
    [
      ["Filter", "/"],
      ["Tasks", "/tasks"],
      ["Contexts", "/contexts"],
      ["Projects", "/projects"],
    ].map((x) => (x[1] === location.pathname ? [...x, true] : [...x, false]))
  );

  const history = useHistory();
  const hundleClick = (path: string) => () => {
    setNavData(
      navData.map((x) =>
        x[1] === path ? [x[0], x[1], true] : [x[0], x[1], false]
      )
    );
    history.push(path);
  };

  return (
    <header className="header">
      <nav className="nav">
        {navData.map((x) => (
          <div
            key={`${x[0]}`}
            onClick={hundleClick(`${x[1]}`)}
            className={classNames("item", { active: x[2] })}
          >
            {x[0]}
          </div>
        ))}
      </nav>
      <div className="log">
        {cookies.get("geekTasksToken") ? (
          <div
            onClick={() => {
              cookies.delete("geekTasksToken");
              history.push("/signup");
            }}
            className="disconnect"
          >
            <ZapOff />
          </div>
        ) : (
          <div
            onClick={() => {
              history.push("/signin");
            }}
            className="connect"
          >
            <Zap />
          </div>
        )}
      </div>
    </header>
  );
}
