import { useContext, useState, useEffect } from "react";
import { GenresContext } from "../../GenresContext";
import { API_URL } from "../../config";

export default function AddMovieRow({ onAdd }) {
  const genres = useContext(GenresContext);
  const [title, setTitle] = useState("");
  const [genreId, setGenreId] = useState(undefined);

  useEffect(() => {
    if (genres.length > 0 && !genreId) {
      setGenreId(genres[0].id);
    }
  }, [genres]);

  function postMovie() {
    fetch(API_URL + "/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        genreId,
      }),
    }).then((res) => {
      if (res.ok) {
        onAdd();
      } else {
        console.error("post movie failed");
      }
    });

    setTitle("");
    setGenreId(genres[0].id);
  }

  return genres.length !== 0 ? (
    <tr>
      <td>
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        ></input>
      </td>
      <td>
        <select
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          className="form-select"
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </td>
      <td></td>
      <td>
        <button onClick={postMovie} type="button" className="btn btn-primary">
          Add
        </button>
      </td>
    </tr>
  ) : null;
}
