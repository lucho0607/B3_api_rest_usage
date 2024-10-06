import { useEffect, useState } from "react";

const CatGalleryFetch = () => {
  //estado para almacenar las imagenes de gatitos, lo inicializamos
  //array vacio
  const [cats, setCats] = useState([]);
  //estado para almacenar el error, lo inicializamos en null
  const [error, setError] = useState(null);
  // METODO PARA REALIZAR LA PETICION A LA API CON FETCH
  const [page, setPage] = useState(1);
  const fetchData = async (loadMore = false) => {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&order=DESC`
      );
      //convertimos la respuesta a formato JASON
      const data = await response.json();
      if (loadMore) {
        setCats((prevCats) => [...prevCats, ...data]);
      } else {
        setCats(data);
      }
    } catch (error) {
      console.log("Error al realizar la solicitud", error);
      setError("Error al realizar la solicitud");
    }
  };

  //setear la variable de estado cats a traves de su metodo setCats
  //setear: darle valor a un estado
  //     setCats("Error al realizar la solicitud");<
  //   } catch (error) {
  //     console.log("error al realizar la solicitud", error);
  //     setError(error);

  // useEffect ejecuta el metodo fetchData la primera vez que se monta
  //el componente (hace la peticion de la Api)

  useEffect(() => {
    fetchData();
  }, []);

  const loadMoreCats = () => {
    setPage((prevPage) => prevPage + 1);
    fetchData(true); // indecamos q estamos cargando mas gatos
  };
  if (error) {
    return (
      <div className="alert -alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-white mb-4">
        Galeria de Gatitos con Fetch
      </h2>
      {/* Agregamos un contenedor scroll y altura fija */}
      <div className="row overFlow-auto vh-60 scrollable-container">
        {cats.map((cat, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 d-flex flex-column">
              {/* aseguramos que la imagen tenga un tamaño uniforme */}
              <img src={cat.url} className="fixed-img" alt="Cat" />
              <div>
                <h5 className="card-title">Gatito {index + 1}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* boton opara cargar mas gatos */}
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={loadMoreCats}>
          Cargar mas gatos
        </button>
      </div>
    </div>
  );
};

export default CatGalleryFetch;
