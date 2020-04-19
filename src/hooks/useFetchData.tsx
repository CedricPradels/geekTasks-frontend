import { useEffect, useState } from "react";

export default function useFetchData(url: string) {
  const [state, setState] = useState({ data: null, isLoading: true });

  useEffect(() => {
    setState((x) => ({ data: x.data, isLoading: true }));
    fetch(url)
      .then((x) => x.json())
      .then((y) => setState({ data: y, isLoading: false }));
  }, [url]);
  return state;
}
