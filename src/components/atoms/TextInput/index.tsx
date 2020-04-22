import React from "react";

import "./style.css";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  name?: string;
}

export default function ({ onChange, value, type, name = "" }: Props) {
  return (
    <input
      className="input"
      type={type}
      onChange={onChange}
      value={value}
      name={name}
    />
  );
}
