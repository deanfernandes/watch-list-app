export default function MovieRow({ watched }) {
  return (
    <tr>
      <td>Die Hard</td>
      <td>Action</td>
      <td>{watched ? "✔️" : "❌"}</td>
      <td>
        <button>Edit</button>
      </td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  );
}
