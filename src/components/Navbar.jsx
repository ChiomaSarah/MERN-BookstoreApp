import React, { useState } from "react";
import { Link } from "react-router-dom";
import useToken from "../useToken";

function Navbar() {
  const { token } = useToken();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <Link to="/" onClick={closeMenu}>
        <h3 className="text-light navbar-brand">BOOK STORE</h3>
      </Link>

      <button
        className="navbar-toggler bg-dark"
        type="button"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link"
              id="navbar-list"
              onClick={closeMenu}
              style={{ fontSize: "18px" }}
            >
              Home
            </Link>
          </li>

          {token ? (
            <li className="nav-item">
              <Link
                to="/books"
                className="nav-link"
                id="navbar-list"
                onClick={closeMenu}
                style={{ fontSize: "18px" }}
              >
                Books
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link
                to="/auth/login"
                className="nav-link"
                id="navbar-list"
                onClick={closeMenu}
                style={{ fontSize: "18px" }}
              >
                Login
              </Link>
            </li>
          )}

          {!token && (
            <li className="nav-item">
              <Link
                to="/auth/signup"
                className="nav-link"
                id="navbar-list"
                onClick={closeMenu}
                style={{ fontSize: "18px" }}
              >
                SignUp
              </Link>
            </li>
          )}

          {token && (
            <li className="nav-item">
              <Link
                to="/auth/logout"
                className="nav-link"
                id="navbar-list"
                onClick={() => {
                  closeMenu();
                  window.location.reload();
                }}
                style={{ fontSize: "18px" }}
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
