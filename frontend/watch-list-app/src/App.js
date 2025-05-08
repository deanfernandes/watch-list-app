import "./App.css";
import Header from "./components/Header";
import MoviesTable from "./components/movies/MoviesTable";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { GenresContext } from "./GenresContext";
import { API_URL } from "./config";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const fetchMovies = () => {
    fetch(API_URL + "/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((e) => console.log(e));
  };

  const fetchGenres = () => {
    fetch(API_URL + "/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch((e) => console.log(e));
  };

  const handleAddUpdateDeleteMovie = () => {
    fetchMovies();
  };

  return (
    <div className="wrapper">
      <header>
        <Header title="WatchList"></Header>
      </header>

      <main>
        <GenresContext.Provider value={genres}>
          <MoviesTable
            movies={movies}
            onAddMovie={handleAddUpdateDeleteMovie}
            onUpdateDeleteMovie={handleAddUpdateDeleteMovie}
          ></MoviesTable>
        </GenresContext.Provider>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default App;
