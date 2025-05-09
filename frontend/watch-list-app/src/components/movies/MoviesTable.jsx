import MovieRow from "./MovieRow";
import AddMovieRow from "./AddMovieRow";
import "./MoviesTable.css";
import { useState } from "react";

export default function MoviesTable({
  movies,
  onAddMovie,
  onUpdateDeleteMovie,
}) {
  const [ascending, setAscending] = useState(true);

  if (ascending) {
    movies.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    movies.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <table className="moviesTable">
      <caption>Movies</caption>
      <thead>
        <tr>
          <th>
            Title{" "}
            <button
              title={
                ascending
                  ? "Ascending (Sorted A to Z)"
                  : "Descending (Sorted Z to A)"
              }
              onClick={() => setAscending(!ascending)}
            >
              {ascending ? "AZ⬇" : "ZA⬇"}
            </button>
          </th>
          <th>Genre</th>
          <th>Watched?</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <MovieRow
            key={movie.id}
            movie={movie}
            onUpdateDelete={onUpdateDeleteMovie}
          ></MovieRow>
        ))}
        <AddMovieRow onAdd={onAddMovie}></AddMovieRow>
      </tbody>
    </table>
  );
}
