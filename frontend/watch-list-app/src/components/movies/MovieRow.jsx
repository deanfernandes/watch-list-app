import { useContext, useState } from "react";
import { GenresContext } from "../../GenresContext";
import { API_URL } from "../../config";

export default function MovieRow({ movie, onUpdateDelete }) {
  const genres = useContext(GenresContext);
  const genre = genres.find((element) => element.id === movie.genreId);

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(movie.title);
  const [genreId, setGenreId] = useState(movie.genreId);
  const [watched, setWatched] = useState(false);

  function deleteMovie(id) {
    fetch(API_URL + "/movies/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        onUpdateDelete();
      } else {
        console.error("");
      }
    });
  }

  function updateMovie(id) {
    fetch(API_URL + "/movies/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        genreId,
        watched,
      }),
    }).then((res) => {
      if (res.ok) {
        setEdit(false);
        onUpdateDelete();
      } else {
        console.error("");
      }
    });
  }

  return genre ? (
    edit ? (
      <tr>
        <td>
          <input
            type="text"
            placeholder=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </td>
        <td>
          <select value={genreId} onChange={(e) => setGenreId(e.target.value)}>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </td>
        <td>
          <input
            type="checkbox"
            checked={watched}
            onChange={(e) => setWatched(e.target.checked)}
          ></input>
        </td>
        <td>
          <button onClick={() => updateMovie(movie.id)}>Save</button>
        </td>
        <td>
          <button
            onClick={() => {
              setEdit(false);
              setTitle(movie.title);
              setGenreId(movie.genreId);
              setWatched(movie.watched);
            }}
          >
            Cancel
          </button>
        </td>
      </tr>
    ) : (
      <tr>
        <td>{movie.title}</td>
        <td>{genre.name}</td>
        <td style={{ textAlign: "center" }}>{movie.watched ? "✔️" : "❌"}</td>
        <td>
          <button onClick={() => setEdit(true)}>Edit</button>
        </td>
        <td>
          <button onClick={() => deleteMovie(movie.id)}>Delete</button>
        </td>
      </tr>
    )
  ) : (
    <tr>
      <td>Loading...</td>
    </tr>
  );
}
