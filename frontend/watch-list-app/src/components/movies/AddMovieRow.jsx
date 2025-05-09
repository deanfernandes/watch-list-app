import { useContext, useState } from "react";
import { GenresContext } from "../../GenresContext";
import { API_URL } from "../../config";

export default function AddMovieRow({ onAdd }) {
  const genres = useContext(GenresContext);
  const [title, setTitle] = useState("");
  const [genreId, setGenreId] = useState();

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
      <td></td>
      <td>
        <button onClick={postMovie}>Add</button>
      </td>
    </tr>
  ) : null;
}
