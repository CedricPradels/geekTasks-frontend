import React, { useState, useEffect } from "react";

import { Trash } from "react-feather";

import Loader from "../../atoms/Loader";
import ListItem from "../../atoms/ListItem";
import List from "../../molecules/List";

import Button from "../../atoms/Button";

interface Props {
  contexts: string[];
}

export default function TasksDisplay({ contexts }: Props) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}task/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contextsId: contexts }),
        }
      );
      setData(await response.json());
    };
    getTasks();
  }, [contexts]);

  return (
    <List>
      {data !== null ? (
        <>
          {data.tasks.map((task: any) => (
            <ListItem key={task._id}>
              <Button
                onClick={(e) => {
                  fetch(
                    `${process.env.REACT_APP_BACKEND_URL}task/${task._id}`,
                    {
                      method: "DELETE",
                    }
                  );
                  setData((x: any) => ({
                    success: x.success,
                    tasks: x.tasks.filter((y: any) => y._id !== task._id),
                  }));
                }}
              >
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
