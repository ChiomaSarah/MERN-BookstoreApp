import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ setToken }) => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [error, setError] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const body = {
        email,
        password,
      };

      const response = await fetch(
        "https://bookstore-api-mongodb.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify(body),
        },
      );

      const result = await response.json();
      // console.log(result);
      setToken(result);

      if (!response.ok) {
        throw Error(result.error);
      }

      if (response.ok) {
        history.push("/");
        window.location.reload();
      }
    } catch (err) {
      setError(err.message);
    }
  }

  if (setError.message) {
    error = <div>{setError.message}</div>;
  }

  return (
    <>
      <div className="container py-5 h-80">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-7">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 " id="img-box">
                  <img
                    src="https://i.ibb.co/cbQmdBm/Book-Logo.png"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem", height: "69.7vh" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div
                        className="mb-3"
                        style={{ fontSize: "14px", color: "#ff8c00" }}
                      >
                        {error}
                      </div>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h3 mb-0" id="form-logo-font">
                          BOOK STORE
                        </span>
                      </div>

                      <h5
                        className="fw-normal mb-1 pb-3"
                        style={{ letterSpacing: "1px", color: "#0d0c22" }}
                      >
                        Log into your account
                      </h5>

                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-mb"
                          required
                          placeholder="Email Address"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-md"
                          required
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-lg btn-block text-white"
                          style={{ backgroundColor: "#0d0c22" }}
                          type="submit"
                        >
                          Login
                        </button>
                      </div>

                      <p className="mb-5 pb-sm-2" id="redirection-link">
                        Don't have an account?{" "}
                        <a href="/auth/signup">
                          <b>Sign Up here</b>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
