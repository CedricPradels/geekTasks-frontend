import React, { useEffect, useState } from "react";

import { Trash, Radio } from "react-feather";

import Loader from "../components/atoms/Loader";

import TextInput from "../components/atoms/TextInput";
import Title from "../components/atoms/Title";
import Button from "../components/atoms/Button";
import TitleBox from "../components/organisms/TitleBox";
import List from "../components/molecules/List";
import ListItem from "../components/atoms/ListItem";
import CheckInput from "../components/atoms/CheckInput";
import RadioInput from "../components/atoms/RadioInput";

import Default from "../components/templates/Default";

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
    fetch(`${process.env.REACT_APP_BACKEND_URL}context`)
      .then((x) => x.json())
      .then((y) =>
        setContexts(
          y.contexts.map((context: Context) => ({ ...context, checked: false }))
        )
      );
    fetch(`${process.env.REACT_APP_BACKEND_URL}project`)
      .then((x) => x.json())
      .then((y) =>
        setProjects(
          y.projects.map((project: Project) => ({ ...project, checked: false }))
        )
      );
    fetch(`${process.env.REACT_APP_BACKEND_URL}task/search`, {
      method: "POST",
    })
      .then((x) => x.json())
      .then((y) => setTasks(y.tasks));
  }, []);

  return (
    <Default>
      <Title level={2}>New Task</Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`${process.env.REACT_APP_BACKEND_URL}task`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              contexts: contexts?.filter((x) => x.checked),
              project: projects?.filter((x) => x.checked)[0],
            }),
          }).then((x) => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}task/search`, {
              method: "POST",
            })
              .then((x) => x.json())
              .then((y) => setTasks(y.tasks));
            setTitle("");
          });
        }}
      >
        <div>
          <TextInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit">Create</Button>
        </div>

        <TitleBox title="Contexts list">
          {contexts ? (
            <List>
              {contexts.map((context) => (
                <ListItem key={context._id}>
                  <CheckInput
                    checked={context.checked}
                    onClick={(e) => {
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
                </ListItem>
              ))}
            </List>
          ) : (
            <Loader />
          )}
        </TitleBox>
        <TitleBox title="Projects list">
          {projects ? (
            <List>
              {projects.map((project) => (
                <ListItem key={project._id}>
                  <RadioInput
                    id={project._id}
                    checked={project.checked}
                    onClick={() => {
                      setProjects(
                        projects.map((x) =>
                          project.checked
                            ? { ...x, checked: false }
                            : x._id === project._id
                            ? { ...x, checked: true }
                            : { ...x, checked: false }
                        )
                      );
                    }}
                  />
                  <label htmlFor={project._id}>{project.title}</label>
                </ListItem>
              ))}
            </List>
          ) : (
            <Loader />
          )}
        </TitleBox>
      </form>
      <TitleBox title="Tasks list">
        {tasks ? (
          <List>
            {tasks.map((task) => (
              <ListItem key={task._id}>
                <Button
                  onClick={() => {
                    fetch(
                      `${process.env.REACT_APP_BACKEND_URL}task/${task._id}`,
                      {
                        method: "DELETE",
                      }
                    ).then((x) =>
                      fetch(`${process.env.REACT_APP_BACKEND_URL}task/search`, {
                        method: "POST",
                      })
                        .then((x) => x.json())
                        .then((y) => setTasks(y.tasks))
                    );
                  }}
                >
                  <Trash style={{ height: "1rem" }} />
                </Button>
                {task.title}
              </ListItem>
            ))}
          </List>
        ) : (
          <Loader />
        )}
      </TitleBox>
    </Default>
  );
}
