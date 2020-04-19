import React, { useState, useEffect } from "react";
import { Trash } from "react-feather";

import Loader from "../components/atoms/Loader";
import Default from "../components/templates/Default";

import TextInput from "../components/atoms/TextInput";
import Title from "../components/atoms/Title";
import Button from "../components/atoms/Button";

import TitleBox from "../components/organisms/TitleBox";
import ListItem from "../components/atoms/ListItem";
import List from "../components/molecules/List";

interface Project {
  _id: string;
  title: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<null | Project[]>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}project`)
      .then((x) => x.json())
      .then((y) => setProjects(y.projects));
  }, []);

  return (
    <Default>
      <Title level={1}>New project</Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`${process.env.REACT_APP_BACKEND_URL}project`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
            }),
          }).then((x) =>
            fetch(`${process.env.REACT_APP_BACKEND_URL}project`)
              .then((x) => x.json())
              .then((y) => setProjects(y.projects))
          );
          setTitle("");
        }}
      >
        <TextInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <Button type="submit">Add</Button>
      </form>
      <TitleBox title="Projects list">
        <List>
          {projects ? (
            <>
              {projects.map((project) => (
                <ListItem key={project._id}>
                  <Button
                    onClick={() => {
                      fetch(
                        `${process.env.REACT_APP_BACKEND_URL}project/${project._id}`,
                        {
                          method: "DELETE",
                        }
                      ).then((x) =>
                        fetch(`${process.env.REACT_APP_BACKEND_URL}project`)
                          .then((x) => x.json())
                          .then((y) => setProjects(y.projects))
                      );
                    }}
                  >
                    <Trash style={{ height: "1rem" }} />
                  </Button>
                  {project.title}{" "}
                </ListItem>
              ))}
            </>
          ) : (
            <Loader />
          )}
        </List>
      </TitleBox>
    </Default>
  );
}
