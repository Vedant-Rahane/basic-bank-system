import React, { useState, useEffect } from "react";
import api from "../api";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/userDetail.css";

function UserDetail({ match }) {
  const [user, setUser] = useState({});

  async function fetchData() {
    await api.getUserById(match.params.id).then((res) => {
      setUser(res.data.data);
      console.log(res.data.data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(e);
  }

  return (
    <div className="user-detail-container">
      <section className="container">
        <div className="title">
          <h2>User</h2>
          <div className="underline"></div>
        </div>
        <div className="user-detail">
          <div className="img-container">
            <img src={user.image} alt={user.fName} className="person-img" />
          </div>
          <Table className="user-table">
            <tbody>
              <tr>
                <td>First Name</td>
                <td>{user.fName}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{user.lName}</td>
              </tr>
              <tr>
                <td>Account No.</td>
                <td>{user.accountNo}</td>
              </tr>
              <tr>
                <td>Email Id</td>
                <td>{user.emailId}</td>
              </tr>
              <tr>
                <td>Balance</td>
                <td>{user.currentBal}</td>
              </tr>
            </tbody>
          </Table>
          <Button
            className="transfer-container-btn"
            variant="primary"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Transfer Money
          </Button>

          <div className="collapse collapse-container" id="collapseExample">
            <form onSubmit={onSubmit}>
              <div className="transfer-form">
                <label for="basic-url">Account Number</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Account Number"
                    aria-label="AccountNo"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <label for="basic-url">Amount</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">₹</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Amount (to the nearest dollar)"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">.00</span>
                  </div>
                </div>
                <label for="basic-url">Name</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Receiver Name"
                    aria-label="AccountNo"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label className="custom-control-label" for="customCheck1">
                    Are you sure to continue transaction
                  </label>
                </div>
              </div>
              <Link to={`/user/${user.accountNo}`}>
                <Button className="transfer-btn" variant="primary">
                  Transfer
                </Button>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserDetail;
