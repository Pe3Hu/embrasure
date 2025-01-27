import React from "react";

export default function Table({
  rooms,
  handleEdit,
  handleDelete,
  setIsAdding,
}) {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>id</th>
            <th>min players</th>
            <th>max players</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms ? (
            rooms.map((room, i) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.minPlayers}</td>
                <td>{room.maxPlayers}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(room.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}></td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setIsAdding(true)}>Add Room</button>
    </div>
  );
}
