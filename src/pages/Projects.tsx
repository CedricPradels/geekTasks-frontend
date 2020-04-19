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

  const deleteProject = async (id: string) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}project/${id}`, {
      method: "DELETE",
    });
  };

  const createProject = async (title: string) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });
  };

  const handleSubmit = (title: string) => async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await createProject(title);
    fetchProjects();
    resetTitle();
  };

  const handleDeleteProject = (id: string) => async () => {
    await deleteProject(id);
    fetchProjects();
  };

  const fetchProjects = async () => {
    const response = await (
      await fetch(`${process.env.REACT_APP_BACKEND_URL}project`)
    ).json();
    setProjects(response.projects);
  };
  const resetTitle = () => setTitle("");

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Default>
      <Title level={1}>New project</Title>
      <form onSubmit={handleSubmit(title)}>
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
                  <Button onClick={handleDeleteProject(project._id)}>
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
