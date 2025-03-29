import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const API_URL = `${window.location.origin.replace(":5173", ":7878")}/users`;

    axios
      .get(API_URL)
      .then((res) => {
        console.log("API Response:", res.data); // Log data for debugging
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  return (
    <>
      <div className="mb-3">
        <h1 className="text-center">Employee Data</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
