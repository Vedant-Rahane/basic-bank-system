import React, { useState, useEffect } from "react";
import api from "../api";
import { Table } from "react-bootstrap";
import "./css/AllUsers.css";

function AllUsers() {
  const [users, setUsers] = useState([]);

  async function fetchData() {
    await api.getAllUsers().then((res) => {
      setUsers(res.data.data);
      // console.log(res.data.data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="allUsersBody">
      <h1>Users</h1>
      <Table bordered hover className="styled-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Account No.</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr
                onClick={() => window.open(`/user/${user._id}`, "_self")}
                key={user._id}
              >
                <td>{index + 1}</td>
                <td>
                  {user.fName} {user.lName}
                </td>
                <td>{user.accountNo}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default AllUsers;
