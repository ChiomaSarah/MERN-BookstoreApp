import React, { useState } from "react";
import useToken from "../useToken";

function AddBook() {
  const { token } = useToken();
  const [book, setBook] = useState({
    book_title: "",
    book_author: "",
    book_rating: "",
    book_genre: "",
    book_publication_date: "",
  });
  let [error, setError] = useState("");

  // create a function to handle all changes on the form
  function handleChange(event) {
    const { name, value } = event.target;

    setBook((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  // create a new book
  async function onSubmitForm(event) {
    try {
      event.preventDefault();
      const body = {
        book_title: book.book_title,
        book_author: book.book_author,
        book_rating: book.book_rating,
        book_genre: book.book_genre,
        book_publication_date: book.book_publication_date,
      };

      const response = await fetch(
        "https://bookstore-api-mongodb.onrender.com/books",
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      );
      const result = await response.json();
      if (response.ok) {
        alert("Success: Book Added!");
        window.location = "/books";
      }

      if (!response.ok) {
        throw Error(result.error);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  if (setError.message) {
    error = { setError };
  }

  return (
    <div className="container">
      <div
        className=" text-warning mb-3 mt-5 pb-3 text-center"
        style={{ fontSize: "14px" }}
      >
        {error}
      </div>
      <h3 className="text-center mb-5 ">Add a Book</h3>
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <input
            onChange={handleChange}
            className="form-control"
            name="book_title"
            nvalue={book.book_title}
            type="text"
            placeholder="Book Title"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="book_author"
            value={book.book_author}
            type="text"
            className="form-control"
            placeholder="Book Author"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="book_rating"
            value={book.book_rating}
            type="number"
            min="1"
            className="form-control"
            placeholder="Book Rating"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="book_genre"
            value={book.book_genre}
            type="text"
            min="1"
            className="form-control"
            placeholder="Book Genre"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="book_publication_date"
            value={book.book_publication_date}
            className="form-control"
            placeholder="dd-mm-yyyy"
            required
          />
        </div>
        <button
          className="btn btn-lg"
          style={{ backgroundColor: "#0099CC", color: "#ffffff" }}
        >
          Create
        </button>
      </form>
    </div>
  );
}
export default AddBook;
