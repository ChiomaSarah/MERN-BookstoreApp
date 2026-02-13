import React, { useState } from "react";
import useToken from "../useToken";

function DeleteBook({ book }) {
  const { token } = useToken();
  const [books, setBooks] = useState([]);
  let [error, setError] = useState("");

  async function deleteBook(id) {
    try {
      await fetch(`https://bookstore-api-mongodb.onrender.com/books/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks(books.filter((book) => book._id !== id));
      alert("Success: Book deleted!");
      window.location = "/books";
    } catch (err) {
      setError(err.message);
    }
  }

  if (setError.message) {
    error = <div>{setError.message}</div>;
  }

  return (
    <div>
      {error}
      <button
        type="button"
        className="btn btn-sm  ml-3"
        style={{ backgroundColor: "#CC0000", color: "#fff" }}
        onClick={() => {
          const confirm = window.confirm(
            "Are you sure you want to delete this record?\n\nThis action cannot be undone.",
          );
          if (confirm === true) {
            deleteBook(book._id);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}
export default DeleteBook;
