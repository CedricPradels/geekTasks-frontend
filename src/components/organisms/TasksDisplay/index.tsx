import React, { useState, useEffect } from "react";

import { Trash } from "react-feather";

import Loader from "../../atoms/Loader";
import ListItem from "../../atoms/ListItem";
import List from "../../molecules/List";

import Button from "../../atoms/Button";

interface Props {
  contexts: string[];
}

interface Task {
  title: string;
  _id: string;
}

interface Response {
  success: boolean;
  tasks: Task[];
}

export default function TasksDisplay({ contexts }: Props) {
  const [data, setData] = useState<any | Task[]>(null);

  const handleClickDelete = (id: string) => () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}task/${id}`, {
      method: "DELETE",
    });
    setData((x: Task) => data.filter((y: Task) => y._id !== id));
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}task/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contextsId: contexts }),
    })
      .then((x) => x.json())
      .then((y: Response) => setData(y.tasks));
  }, [contexts]);

  return (
    <List>
      {data !== null ? (
        <>
          {data.map((task: Task) => (
            <ListItem key={task._id}>
              <Button onClick={handleClickDelete(task._id)}>
                <Trash style={{ height: "1rem" }} />
              </Button>
              {task.title}
            </ListItem>
          ))}
        </>
      ) : (
        <Loader />
      )}
    </List>
  );
}
