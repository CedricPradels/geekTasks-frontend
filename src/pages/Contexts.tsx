import React, { useState, useEffect } from "react";
import { Trash } from "react-feather";

import Loader from "../components/atoms/Loader";
import TextInput from "../components/atoms/TextInput";
import Title from "../components/atoms/Title";
import Button from "../components/atoms/Button";
import TitleBox from "../components/organisms/TitleBox";
import List from "../components/molecules/List";
import ListItem from "../components/atoms/ListItem";

import Default from "../components/templates/Default";

interface Context {
  _id: string;
  title: string;
}

export default function Contexts() {
  const [contexts, setContexts] = useState<null | Context[]>(null);
  const [title, setTitle] = useState("");

  const fetchContexts = async () => {
    const response = await (
      await fetch(`${process.env.REACT_APP_BACKEND_URL}context`)
    ).json();
    setContexts(response.contexts);
  };

  const deleteProject = async (id: string) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}context/${id}`, {
      method: "DELETE",
    });
  };

  const handleDeleteClick = (id: string) => async () => {
    await deleteProject(id);
    fetchContexts();
  };

  const resetTitle = () => {
    setTitle("");
  };

  const createContext = async (title: string) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}context`, {
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
    await createContext(title);
    fetchContexts();
    resetTitle();
  };

  useEffect(() => {
    fetchContexts();
  }, []);

  return (
    <Default>
      <Title level={2}>New context</Title>
      <form onSubmit={handleSubmit(title)}>
        <TextInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>
      <TitleBox title="Context list">
        <List>
          {contexts ? (
            <>
              {contexts.map((context) => (
                <ListItem key={context._id}>
                  <Button onClick={handleDeleteClick(context._id)}>
                    <Trash style={{ height: "1rem" }} />
                  </Button>
                  {context.title}
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
