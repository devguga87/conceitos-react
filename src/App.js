import React, { useState, useEffect} from "react";

import api from "./services/api"; //eu

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:`Novo item ${Date.now()}`,
      url:"http//www.google.com",
      techs:["NodeJS", "ReactJS"],
      likes: 0
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  };

  async function handleRemoveRepository(id) {
    const remove = await api.delete(`repositories/${id}`, 
      setRepositories(repositories.filter(repository => repository.id !== id))
    );
  };

  return (
    <div>
      <ul data-testid="repository-list" >
         {repositories.map(repository => <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
