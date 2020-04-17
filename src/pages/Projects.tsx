import React, { useState, useEffect } from "react";
import { Trash } from "react-feather";

import Loader from "../components/Loader";

interface Project {
  _id: string;
  title: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<null | Project[]>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL_DEV}project`)
      .then((x) => x.json())
      .then((y) => setProjects(y.projects));
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`${process.env.REACT_APP_BACKEND_URL_DEV}project`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
            }),
          }).then((x) =>
            fetch(`${process.env.REACT_APP_BACKEND_URL_DEV}project`)
              .then((x) => x.json())
              .then((y) => setProjects(y.projects))
          );
          setTitle("");
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
        {projects ? (
          <>
            {projects.map((project) => (
              <li key={project._id}>
                {project.title}{" "}
                <button
                  onClick={() => {
                    fetch(
                      `${process.env.REACT_APP_BACKEND_URL_DEV}project/${project._id}`,
                      {
                        method: "DELETE",
                      }
                    ).then((x) =>
                      fetch(`${process.env.REACT_APP_BACKEND_URL_DEV}project`)
                        .then((x) => x.json())
                        .then((y) => setProjects(y.projects))
                    );
                  }}
                >
                  <Trash />
                </button>
              </li>
            ))}
          </>
        ) : (
          <Loader />
        )}
      </ul>
    </>
  );
}
