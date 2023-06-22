import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink, Route, Routes } from "react-router-dom";

function App() {
  const [listOfCharacters, setListOfCharacters] = useState([]); //if empty array, conditionals are not needed with map method
  const baseURL = "https://ih-crud-api.herokuapp.com";

  useEffect(() => {
    axios
      .get(baseURL + "/characters") //OR (`${baseURL}/characters`)
      .then((response) => {
        setListOfCharacters(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const deleteCharacter = (characterName) => {
    const newList = listOfCharacters.filter((element) => {
      return element.name !== characterName;
    });
    setListOfCharacters(newList);
  };

  const renderListOfCharacters = () => {
    if (listOfCharacters === null) {
      return <p>Loading...</p>;
    } else {
      return (
        <section>
          {listOfCharacters &&
            listOfCharacters.map(function (obj) {
              return (
                <div className="character">
                  <div key={obj.id} className="card">
                    <h4>Character: {obj.name}</h4>
                    <p>Occupation: {obj.occupation}</p>
                    <p>Weapon of choice: {obj.weapon}</p>
                    <button
                      onClick={() => {
                        deleteCharacter(obj.name);
                      }}
                    >
                      Delete this character
                    </button>
                  </div>
                </div>
              );
            })}
        </section>
      );
    }
  };
  return (
    <div className="App">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <h1>There are this many characters: {listOfCharacters.length}</h1>
      <Routes>
        <Route path="/" element={<p>{renderListOfCharacters()}</p>} />
        <Route path="/about" element={<p>This is the about page</p>} />
        <Route path="/contact" element={<p>This is the contact page</p>} />
      </Routes>
    </div>
  );
}

export default App;
