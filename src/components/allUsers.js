import React from "react";
import data from "./data";

function AllUsers() {
  console.log(data);
  return (
    <div className="allUsersBody">
      <h1>Users</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email Id</th>
            <th>Current Bal.</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.emailId}</td>
                <td>{user.currentBal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllUsers;
