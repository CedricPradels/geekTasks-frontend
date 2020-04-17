import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import classNames from "classnames";

export default function Header() {
  const [navData, setNavData] = useState([
    ["Filter", "/", true],
    ["Tasks", "/tasks", false],
    ["Contexts", "/contexts", false],
    ["Projects", "/projects", false],
  ]);

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
          <button
            key={`${x[0]}`}
            onClick={hundleClick(`${x[1]}`)}
            className={classNames("button", { active: x[2] })}
          >
            {x[0]}
          </button>
        ))}
      </nav>
    </header>
  );
}
