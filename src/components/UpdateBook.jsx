import { useState } from "react";
import useToken from "../useToken";

function UpdateBook({ book }) {
  const { token } = useToken();
  const [_id, set_id] = useState(book._id);
  const [book_title, setBookTitle] = useState(book.book_title);
  const [book_author, setBookAuthor] = useState(book.book_author);
  const [book_rating, setBookRating] = useState(book.book_rating);
  const [book_genre, setBookGenre] = useState(book.book_genre);
  const [book_publication_date, setBookPublicationDate] = useState(
    book.book_publication_date,
  );
  const [error, setError] = useState("");

  // function to save Changes when the update button is clicked
  async function saveChanges(e) {
    try {
      e.preventDefault();
      const body = {
        id: _id,
        book_title: book_title,
        book_author: book_author,
        book_rating: book_rating,
        book_genre: book_genre,
        book_publication_date: book_publication_date,
      };

      await fetch(
        `https://bookstore-api-mongodb.onrender.com/books/${book._id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      );
      alert("Success: Book Updated!");
      window.location = "/books";
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      {/* create a modal for the update window */}
      <button
        type="button"
        className="btn btn-sm btn-info"
        style={{ backgroundColor: "#0099CC", color: "#ffffff" }}
        data-toggle="modal"
        data-target={`#id${book._id}`}
      >
        Update
      </button>

      <div className="modal" id={`id${book._id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* modal header */}
            <div className="modal-header">
              <h4 className="modal-title" style={{ color: "#262626" }}>
                Edit Book
              </h4>
              {error}
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* modal body: create input tags for all fields*/}
            <div className="modal-body">
              <input
                onChange={(e) => set_id(e.target.value)}
                className="form-control"
                name="_id"
                value={_id}
                type="text"
                placeholder="Book id"
              />
            </div>
            <div className="modal-body">
              <input
                onChange={(e) => setBookTitle(e.target.value)}
                className="form-control"
                name="book_title"
                value={book_title}
                type="text"
                placeholder="Book Title"
              />
            </div>
            <div className="modal-body">
              <input
                onChange={(e) => setBookAuthor(e.target.value)}
                name="book_author"
                value={book_author}
                type="text"
                className="form-control"
                placeholder="Book Author"
              />
            </div>
            <div className="modal-body">
              <input
                onChange={(e) => setBookRating(e.target.value)}
                name="book_rating"
                value={book_rating}
                type="number"
                min="1"
                className="form-control"
                placeholder="Book Rating"
              />
            </div>
            <div className="modal-body">
              <input
                onChange={(e) => setBookGenre(e.target.value)}
                name="book_genre"
                value={book_genre}
                type="text"
                min="1"
                className="form-control"
                placeholder="Book Genre"
              />
            </div>
            <div className="modal-body">
              <input
                onChange={(e) => setBookPublicationDate(e.target.value)}
                name="book_publication_date"
                value={book_publication_date}
                className="form-control"
                placeholder="dd-mm-yyyy"
              />
            </div>

            {/* modal footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={(e) => saveChanges(e)}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#CC0000", color: "#fff" }}
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateBook;
