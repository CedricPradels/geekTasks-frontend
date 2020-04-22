import { useState } from "react";

export default function (init: any) {
  const [values, setValues] = useState(init);

  return [
    values,
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
    () =>
      setValues(
        Object.fromEntries(Object.entries(values).map((x) => [x[0], ""]))
      ),
  ];
}
