import React from "react";

const Logout = ({ setToken }) => {
  try {
    const response = fetch(
      "https://bookstore-api-mongodb.onrender.com/auth/logout",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    );
    // console.log(response);
    setToken(response);
  } catch (err) {
    console.log(err.message);
  }

  return (
    <div className="logout-wrapper">
      <div className="logout-inner">
        <h5>Au revoir!</h5>
      </div>
    </div>
  );
};

export default Logout;
