import { useEffect, useState } from "react";

export const RickAndMorty = () => {
  // Estado para almacenar las imágenes de gatitos, lo inicializamos con un array vacío
  const [characters, setCharacter] = useState([]);

  // Estado para manejar posibles errores
  const [error, setError] = useState(null);

  // Método para realizar la petición a la API con fetch
  const fetchData = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");

      // Convertimos la respuesta a formato JSON
      const data = await response.json();

      // Setear la variable de estado cats a través de su método setCats con los datos recibidos de la API
      setCharacter(data.results);
    } catch (error) {
      console.log("Error al realizar la solicitud", error); // Debugg
      setError("Error al realizar la solicitud");
    }
    console.log("Rts: ", characters);
  };

  // useEffect ejecuta el método fetchData la primera vez que se monta el componente ( hace petición de la API)
  useEffect(() => {
    fetchData();
  }, []);

  // Si hay error, mostramos el mensaje de error
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-white mb-4">
        Galería de Rick and Morty con Fetch
      </h2>
      {/* Agregamos un contenedor scroll y altura fija */}
      <div
        className="row overflow-auto vh-80"
        style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
        {/* el map entra 1 a 1 a las imagenes*/}
        {characters.map((character, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 d-flex flex-column">
              <img
                src={character.image}
                className="card-img-top img-fluid object-fit-cover"
                alt="Cat"
              />
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Name: </strong>
                  {character.name}
                </h5>
                <h6 className="card-title">
                  <strong>Status: </strong>
                  {character.status}
                </h6>
                <h6 className="card-title">
                  <strong>Species: </strong>
                  {character.species}
                </h6>
                <h6 className="card-title">
                  <strong>Gender: </strong>
                  {character.gender}
                </h6>
                <h6 className="card-title">
                  <strong>Origin.name: </strong>
                  {character.origin.name}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
