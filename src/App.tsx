import React, { useEffect, useState } from "react";

interface Categorie {
  title: string;
  _id: string;
}

function App() {
  const [contexts, setContexts] = useState<Categorie[] | null>(null);
  useEffect(() => {
    const fetchContexts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}context`,
          { method: "GET" }
        );
        if (response.ok) {
          const datas = await response.json();
          if (datas.success) setContexts(datas.contexts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchContexts();
  }, []);

  return (
    <div className="App">
      <header>
        <button>Agir</button>
        <button>S'organiser</button>
      </header>
      <aside>
        {contexts !== null ? (
          contexts.map((context) => (
            <div key={context._id}>{context.title}</div>
          ))
        ) : (
          <div></div>
        )}
      </aside>
      <main></main>
    </div>
  );
}

export default App;
