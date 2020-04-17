import React, { useState, useEffect } from "react";

import Loader from "../Loader";

interface Props {
  contexts: string[];
}

export default function TasksDisplay({ contexts }: Props) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL_DEV}task/search`,
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
    <ul>
      {data !== null ? (
        <>
          {data.tasks.map((task: any) => (
            <li key={task._id}>
              <input
                type="checkbox"
                id={task._id}
                onChange={(e) => {
                  if (e.target.checked) {
                    fetch(
                      `${process.env.REACT_APP_BACKEND_URL_DEV}task/${task._id}`,
                      {
                        method: "DELETE",
                      }
                    );
                    setData((x: any) => ({
                      success: x.success,
                      tasks: x.tasks.filter((y: any) => y._id !== task._id),
                    }));
                  }
                }}
              />
              <label htmlFor={task._id}>{task.title}</label>
            </li>
          ))}
        </>
      ) : (
        <Loader />
      )}
    </ul>
  );
}
