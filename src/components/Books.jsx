import React, { useState, useEffect } from "react";
import UpdateBook from "./UpdateBook";
import DeleteBook from "./DeleteBook";
import Spinner from "./ui/Spinner";
import Pagination from "./Pagination";
import useToken from "../useToken";
import { Link } from "react-router-dom";

function Books() {
  const { token } = useToken();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  let [error, setError] = useState("");

  // fetch all books from the database
  useEffect(() => {
    async function getBooks() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://bookstore-api-mongodb.onrender.com/books",

          {
            method: "GET",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await response.json();
        setLoading(false);
        if (response.ok) {
          // console.log(result);
          setBooks(result.data);
        }

        if (!response.ok) {
          throw Error(result.error);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    getBooks();
  }, [token]);

  // // create pagination for maximized viewing
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // // change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (setError.message) {
    error = { setError };
  }

  // if page is loading, display a spinning wheel... else, render the fetched books from the database
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div
        className="text-warning mb-3 mt-5 text-center"
        style={{ fontSize: "14px" }}
      >
        {error}
      </div>
      <div className="container text-center mt-5 mb-5">
        <h3>Books</h3>

        <div>
          <h2>
            <Link
              to="/add-book"
              className="nav-link fw-bold text-info float-left mt-5"
            >
              Add Book
            </Link>
          </h2>
        </div>

        <div>
          {/* create a search bar to find a book */}
          <input
            type="text"
            placeholder="search books..."
            className="form-control mt-5 mb-5 float-right"
            id="search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* create a dynamic table */}{" "}
          <table className="table table-bordered mt-5 container">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Rating</th>
                <th scope="col">Genre</th>
                <th scope="col">Publication Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody style={{ color: "#fff" }}>
              {currentBooks
                .filter((val) => {
                  if (searchQuery === " ") {
                    return val;
                  }
                  if (
                    val.book_title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    val.book_author
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    val.book_genre
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    val.book_publication_date.includes(searchQuery)
                  ) {
                    return val;
                  } else {
                    return "";
                  }
                })
                .map((book) => (
                  <tr key={book._id}>
                    <td data-label="Id:">{book._id}</td>
                    <td data-label="Title:">{book.book_title}</td>
                    <td data-label="Author:">{book.book_author}</td>
                    <td data-label="Rating:">{book.book_rating}</td>
                    <td data-label="Genre:">{book.book_genre}</td>
                    <td data-label="Publication Date:">
                      {book.book_publication_date}
                    </td>
                    <td data-label="Action:">
                      <div className="btn-group">
                        <UpdateBook book={book} />
                        <DeleteBook book={book} />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={books.length}
        paginate={paginate}
      />
    </div>
  );
}
export default Books;
