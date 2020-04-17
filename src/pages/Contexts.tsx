import React, { useState, useEffect } from "react";

import Loader from "../components/Loader";

interface Context {
  _id: string;
  title: string;
}

export default function Contexts() {
  const [contexts, setContexts] = useState<null | Context[]>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL_DEV}context`)
      .then((x) => x.json())
      .then((y) => setContexts(y.contexts));
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`${process.env.REACT_APP_BACKEND_URL_DEV}context`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
            }),
          }).then((x) =>
            fetch(`${process.env.REACT_APP_BACKEND_URL_DEV}context`)
              .then((x) => x.json())
              .then((y) => setContexts(y.contexts))
          );
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {contexts ? (
          <>
            {contexts.map((context) => (
              <li key={context._id}>{context.title}</li>
            ))}
          </>
        ) : (
          <Loader />
        )}
      </ul>
    </>
  );
}
