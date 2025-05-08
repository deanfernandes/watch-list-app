import MovieRow from "./MovieRow";
import AddMovieRow from "./AddMovieRow";
import "./MoviesTable.css";

export default function MoviesTable({
  movies,
  onAddMovie,
  onUpdateDeleteMovie,
}) {
  return (
    <table className="moviesTable">
      <caption>Movies</caption>
      <thead>
        <tr>
          <th>Title</th>
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
