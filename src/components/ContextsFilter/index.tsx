import React from "react";

import Loader from "../Loader";
import "./style.css";

import useFetchData from "../../hooks/useFetchData";

interface Context {
  _id: string;
  title: string;
}

interface Contexts {
  success: boolean;
  contexts: Context[];
}

interface Props {
  setState: any;
}

const ContextsFilter = ({ setState }: Props) => {
  const {
    data,
  }: {
    data: any;
  } = useFetchData(`${process.env.REACT_APP_BACKEND_URL_DEV}context`);

  return (
    <div className="context-filter">
      {data !== null ? (
        data.contexts.map((context: Context) => (
          <span key={context._id}>
            <input
              type="checkbox"
              id={context._id}
              onChange={(e) => {
                if (e.target.checked) {
                  setState((x: string[]) => [...x, context._id]);
                } else {
                  setState((x: string[]) => x.filter((y) => y !== context._id));
                }
              }}
            />
            <label htmlFor={context._id}>{context.title}</label>
          </span>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ContextsFilter;
