import React from "react";
import "./style.css";

interface Props {
  id: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  checked: boolean;
}

export default function RadioInput({ onClick, checked }: Props) {
  return (
    <div className="radio-input" onClick={onClick}>
      {checked && <div className="radio-input-checked" />}
    </div>
  );
}
