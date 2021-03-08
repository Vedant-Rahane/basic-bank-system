import React, { useState, useEffect } from "react";
import api from "../api";
import { Table, Button } from "react-bootstrap";
import Plastic from "react-plastic";
import "../css/userDetail.css";

function UserDetail({ match }) {
  const [user, setUser] = useState({});
  const [transaction, setTransaction] = useState({
    accountNo: "",  
    amount: "",
    receiverName: ""
  });


  async function fetchData() {
    await api.getUserById(match.params.id).then((res) => {
      var usersData =  JSON.parse(JSON.stringify(res));
      setUser(usersData.data.data);
      // console.log(usersData);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function hide() {
    const collapseCon = document.querySelector('#collapse');
    collapseCon.setAttribute("class", "collapse-container collapse");
  }

  function toggleAlert() {
    const alert = document.querySelector('#alert');
    alert.setAttribute("class", "alert alert-success alert-dismissible fade show");
  }

  function topScroll() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // function bottomScroll() {
  //   window.scrollTo(0,document.body.scrollHeight);
  // }

  // document.querySelector('#collapse').on('shown.bs.collapse', function () {
  //   this.scrollIntoView();
  // });
  // console.log(document.querySelector);



  function handleChange(event) {
    const { name, value } = event.target;

    setTransaction((prevElements) => {
      return {
        ...prevElements,
        [name]: value
      };
    });
  }

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    console.log(transaction);
    await api.updateUser(user._id, transaction).then(res => {
        // window.alert(`Transaction Successful !`)
      fetchData();
      hide();
      topScroll();
      toggleAlert();
      setTransaction({
        accountNo: "",  
        amount: "",
        receiverName: ""
    })
  })
}


  return (
    <div className="user-detail-container">
      <div id="alert" className="alert alert-warning alert-dismissible fade " role="alert">
        <h6><strong>Success!</strong> Your Payment is Completed.</h6>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <section className="container">
        <div className="title">
          <h2>User</h2>
          <div className="underline"></div>
        </div>
        <div className="user-detail">
          <div className="top-container row">
            <div className="img-container">
              <img src={user.image} alt={user.fName} className="person-img" />
            </div>
            <div className="card-container">
              <Plastic
                type="amex"
                name={user.fName + " " + user.lName}
                expiry="03/2030"
                // expiry={exp}
                // number={user.creditCard.number}
                number="236526723766728"
                //cvc={user.creditCard.cvv}
                cvc="678"
              />
            </div>
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
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Phone No.</td>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <td>Account Type</td>
                <td>{user.accountType}</td>
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
            data-target="#collapse"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Transfer Money
          </Button>

          <div  className="collapse collapse-container" id="collapse">
            <form onSubmit={handleUpdateUser} className="needs-validation has-validation">
              <div className="transfer-form">
                <label>Account Number</label>
                <div className="input-group mb-3">
                  <input
                    name="accountNo"
                    type="text"
                    onChange={handleChange}
                    value={transaction.accountNo}
                    className="form-control"
                    placeholder="Account Number"
                    required
                  />
                  <div className="invalid-feedback">
                    Please Enter Account Number
                  </div>
                </div>
                <label>Amount</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">₹</span>
                  </div>
                  <input
                    name="amount"
                    type="text"
                    onChange={handleChange}
                    value={transaction.amount}
                    className="form-control"
                    required
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">.00</span>
                  </div>
                  <div className="invalid-feedback">
                    Please Enter Amount
                  </div>
                </div>
                <label>Name</label>
                <div className="input-group mb-3">
                  <input
                    name="receiverName"
                    type="text"
                    onChange={handleChange}
                    value={transaction.receiverName}
                    className="form-control"
                    placeholder="Receiver Name"
                    required
                  />
                  <div className="invalid-feedback">
                    Please Enter Receiver Name
                  </div>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                  <label className="form-check-label" for="invalidCheck">
                    Are you sure to continue transaction
                  </label>
                  <div className="invalid-feedback">
                    Check the box to continue
                  </div>
                </div>

                </div>
                <Button type="submit" className="transfer-btn" variant="primary">
                  Transfer
                </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserDetail;
