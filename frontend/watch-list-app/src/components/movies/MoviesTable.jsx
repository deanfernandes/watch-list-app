import MovieRow from "./MovieRow";
import AddMovieRow from "./AddMovieRow";
import "./MoviesTable.css";

export default function MoviesTable() {
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
        <MovieRow watched={true}></MovieRow>
        <MovieRow watched={false}></MovieRow>

        <AddMovieRow></AddMovieRow>
      </tbody>
    </table>
  );
}
