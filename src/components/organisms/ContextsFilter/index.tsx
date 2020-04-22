import React, { useState, useEffect } from "react";

import Loader from "../../atoms/Loader";
import "./style.css";

import ListItem from "../../atoms/ListItem";
import List from "../../molecules/List";
import CheckInput from "../../atoms/CheckInput";
import cookies from "../../../helpers/cookies";

interface Context {
  _id: string;
  title: string;
  checked: boolean;
}

interface Contexts {
  success: boolean;
  contexts: Context[];
}

interface Props {
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const ContextsFilter = ({ setState }: Props) => {
  const [contexts, setContexts] = useState<null | Context[]>(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}context`, {
      headers: {
        Authorization: `Bearer ${cookies.get("geekTasksToken")}`,
      },
    })
      .then((x) => x.json())
      .then((y) =>
        setContexts(
          y.contexts.map((context: Context) => ({
            ...context,
            selected: false,
          }))
        )
      );
  }, []);

  return (
    <div className="context-filter">
      {contexts !== null ? (
        <List>
          {contexts.map((context) => (
            <ListItem key={context._id}>
              <CheckInput
                onClick={(e) => {
                  const swap = contexts.map((x) => {
                    if (x._id === context._id) {
                      return { ...x, checked: !x.checked };
                    } else {
                      return x;
                    }
                  });
                  setContexts(swap);
                  setState(swap.filter((x) => x.checked));
                }}
                checked={context.checked}
              />
              <label htmlFor={context._id}>{context.title}</label>
            </ListItem>
          ))}
        </List>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ContextsFilter;
