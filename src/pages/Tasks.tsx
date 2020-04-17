import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";

interface Project {
  title: string;
  _id: string;
  checked: boolean;
}

interface Context {
  title: string;
  _id: string;
  checked: boolean;
}

interface Task {
  title: string;
  _id: string;
  project: string;
  contexts: string[];
}

export default function Tasks() {
  const [contexts, setContexts] = useState<null | Context[]>(null);
  const [projects, setProjects] = useState<null | Project[]>(null);
  const [tasks, setTasks] = useState<null | Task[]>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL_DEV}context`)
      .then((x) => x.json())
      .then((y) =>
        setContexts(
          y.contexts.map((context: Context) => ({ ...context, checked: false }))
        )
      );
    fetch(`${process.env.REACT_APP_BACKEND_URL_DEV}project`)
      .then((x) => x.json())
      .then((y) =>
        setProjects(
          y.projects.map((project: Project) => ({ ...project, checked: false }))
        )
      );
    fetch(`${process.env.REACT_APP_BACKEND_URL_DEV}task`)
      .then((x) => x.json())
      .then((y) => setTasks(y.tasks));
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`${process.env.REACT_APP_BACKEND_URL_DEV}task`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              contexts: contexts?.filter((x) => x.checked),
              project: projects?.filter((x) => x.checked)[0],
            }),
          }).then((x) => setTitle(""));
        }}
      >
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Create</button>
        </div>
        <div>
          {contexts ? (
            <ul>
              {contexts.map((context) => (
                <li key={context._id}>
                  <input
                    id={context._id}
                    type="checkbox"
                    checked={context.checked}
                    onChange={(e) => {
                      setContexts(
                        contexts.map((x) =>
                          x._id === context._id
                            ? { ...x, checked: !x.checked }
                            : x
                        )
                      );
                    }}
                  />
                  <label htmlFor={context._id}>{context.title}</label>
                </li>
              ))}
            </ul>
          ) : (
            <Loader />
          )}
        </div>
        <div>
          {projects ? (
            <ul>
              {projects.map((project) => (
                <li key={project._id}>
                  <input
                    id={project._id}
                    type="radio"
                    name="project"
                    checked={project.checked}
                    onChange={() => {
                      setProjects(
                        projects.map((x) =>
                          x._id === project._id
                            ? { ...x, checked: true }
                            : { ...x, checked: false }
                        )
                      );
                    }}
                  />
                  <label htmlFor={project._id}>{project.title}</label>
                </li>
              ))}
            </ul>
          ) : (
            <Loader />
          )}
        </div>
      </form>
    </>
  );
}
