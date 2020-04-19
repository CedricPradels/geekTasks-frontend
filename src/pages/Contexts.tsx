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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}context`)
      .then((x) => x.json())
      .then((y) => setContexts(y.contexts));
  }, []);

  return (
    <Default>
      <Title level={2}>New contact</Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`${process.env.REACT_APP_BACKEND_URL}context`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
            }),
          }).then((x) =>
            fetch(`${process.env.REACT_APP_BACKEND_URL}context`)
              .then((x) => x.json())
              .then((y) => setContexts(y.contexts))
          );
          setTitle("");
        }}
      >
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
                  <Button
                    onClick={() => {
                      fetch(
                        `${process.env.REACT_APP_BACKEND_URL}context/${context._id}`,
                        {
                          method: "DELETE",
                        }
                      ).then((x) =>
                        fetch(`${process.env.REACT_APP_BACKEND_URL}context`)
                          .then((x) => x.json())
                          .then((y) => setContexts(y.contexts))
                      );
                    }}
                  >
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
