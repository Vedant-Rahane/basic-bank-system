import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Plastic from "react-plastic";
import "./css/UserDetail.css";
import Error from './Error';
import api from "../api";


function UserDetail({ match }) {
  const [user, setUser] = useState({});
  const [transaction, setTransaction] = useState({
    receiverId: "",
    receiverAccountNo: "",  
    amount: "",
    receiverName: "",
    senderCurrentBalance: ""
  });
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState({accountNo:""});
  const [amount, setAmount] = useState("");
  const [showTransferMoneyText, setShowTransferMoneyText] = useState(true);
  const [showTrasactionsText, setShowTrasactionsText] = useState(true);
  const [transactionHistory, setTransactionHistory] = useState([{
    date: "",
    type: "",
    narration: "",
    amount: ""
  }]);
  const [err, setErr] = useState(null);

  async function fetchUsers() {
    await api.getAllUsers().then((res) => {
      setUsers(res.data.data);
    }).catch(err => {
      console.log("CATCH = ", err.response);
    });
  }

  async function fetchUser() {
    await api.getUserById(match.params.id).then((res) => {
      var usersData =  JSON.parse(JSON.stringify(res));
      setUser(usersData.data.data);
      setTransactionHistory(usersData.data.data.accountHistory)
    });
  }

  async function fetchReceiver(id) {
    await api.getUserById(id).then((res) => {
      var receiversData =  JSON.parse(JSON.stringify(res));
      setReceiver(receiversData.data.data);
    });
  }

  useEffect(() => {
    fetchUser();
    fetchUsers();
  }, []);

  // To get all users except current user
  const uniqueUsers = users.filter((uniqueUser, index) => {
    return uniqueUser._id !== user._id;
  });

  // To hide transaction card
  function hideTransfer() {
    setShowTransferMoneyText(true);
    const transferCon = document.querySelector('#collapseTransfer');
    transferCon.setAttribute("class", "collapse");
  }

  function hideTransaction() {
    setShowTrasactionsText(true);
    const transactionCon = document.querySelector('#collapseTransaction');
    transactionCon.setAttribute("class", "collapse");
  }

  function showAlert() {
    document.querySelector('#alertMsg').style.visibility = "visible";
  }
  
  function closeAlert(){
    document.querySelector('#alertMsg').style.visibility = "hidden";
    window.location.reload();
  }

  // To scroll the page to top after transaction
  function topScroll() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // To get ID of receiver from selected option
  function getReceiverId() {
    var x = document.getElementById("receiversOption").selectedIndex;
    fetchReceiver(document.getElementsByTagName("option")[x].value);
  }

  const loadingAnimation = () => {
    document.querySelector(".overlay").classList.add("show");
    document.querySelector(".spanner").classList.add("show");
    
    setTimeout(() => {
      document.querySelector(".overlay").classList.remove("show");
      document.querySelector(".spanner").classList.remove("show");
    }, 3000);
    
  }

  // To store entered Amount
  function handleChange(event) {
    setAmount(event.target.value);
    setTransaction({
      receiverId: receiver._id,
      receiverAccountNo: receiver.accountNo,  
      amount: event.target.value,
      receiverName: receiver.fName + " " + receiver.lName,
      senderCurrentBalance: user.currentBal
    })
  }


  // To update user in backend by making patch request

const transferMoney = async () => {
  await api.updateUser(user._id, transaction)
      .then(res => {
        
        setTransaction({
          receiverId: "",
          receiverAccountNo: "",  
          amount: "",
          receiverName: "",
          senderCurrentBalance: ""
        });
        
      }).catch(err => {

        console.log("CATCH = ", err.response.data.message);
        setErr(err.response.data.message);

      });

      setTimeout(() => {
        fetchUser();
        topScroll();
        hideTransfer();
        showAlert();
      }, 3000);
}

  function cancelTransfer() {
    setErr("Sorry! Amount Entered is greater than current balance.");
    setTransaction({
      receiverId: "",
      receiverAccountNo: "",  
      amount: "",
      receiverName: "",
      senderCurrentBalance: ""
    });
  }


  async function handleUpdateUser(event) {
    event.preventDefault();
    
    if (parseInt(transaction.amount) < Number((transaction.senderCurrentBalance).replace(/[^0-9.-]+/g, ""))) {
      loadingAnimation();
      await transferMoney();
    } else {
      loadingAnimation();
      setTimeout(() => {cancelTransfer()},3000);
    }
  }

  return (
    <div className="user-detail-container">
      <div
        id="alertMsg"
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong>Success!</strong> Your Payment of <strong>Rs. {amount}</strong>{" "}
        to{" "}
        <strong>
          {receiver.fName} {receiver.lName}
        </strong>{" "}
        is Completed.
        <button
          onClick={closeAlert}
          type="button"
          className="close"
          aria-label="Close"
        >
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
            <div className="col-lg-4 col-md-4 img-container">
              <div className="img">
              <img src={user.image} alt={user.fName} className="person-img" />
              </div>
            </div>
            <div className="col-lg-8 col-md-8 card-container">
              <Plastic
                className="credit-card"
                type="amex"
                name={user.fName + " " + user.lName}
                expiry={user.creditCard ? user.creditCard.exp : "03/2030"}
                number={
                  user.creditCard ? user.creditCard.number : "236526723766728"
                }
                cvc={user.creditCard ? user.creditCard.cvv : "678"}
              />
            </div>
          </div>
          <Table className="user-table" responsive >
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

          <div className="btn-container">
            <Button
              className="user-container-btn"
              onClick={() => {
                hideTransaction()
                setShowTransferMoneyText(!showTransferMoneyText)
                }}
              variant="primary"
              data-toggle="collapse"
              data-target="#collapseTransfer"
              aria-expanded="false"
              aria-controls="collapseTransfer"
            >
              {showTransferMoneyText ? "Transfer Money" : "Cancel transfer"}
            </Button>
            <Button
              className="user-container-btn"
              onClick={() => {
                hideTransfer()
                setShowTrasactionsText(!showTrasactionsText)
              }}
              variant="primary"
              data-toggle="collapse"
              data-target="#collapseTransaction"
              aria-expanded="false"
              aria-controls="collapseTransaction"
            >
              {showTrasactionsText ? "Show Transactions" : "Hide Transactions"}
            </Button>
          </div>

          <div className="collapse container-fluid" id="collapseTransfer">
            {err && <div className="inlineForm__notif">
              <Error error={err}/>
            </div>}
            <form
              onSubmit={handleUpdateUser}
              className="needs-validation has-validation"
            >
              <div className="transfer-form">
                <label>Receiver Name</label>
                <div className="input-group mb-3">
                  <select
                    id="receiversOption"
                    onChange={getReceiverId}
                    className="form-control"
                    aria-label="Default select example"
                    required
                  >
                    <option value="" selected disabled hidden>
                      Select Receiver
                    </option>
                    {uniqueUsers.map((user, index) => {
                      return (
                        <option key={index} value={user._id}>
                          {user.fName + " " + user.lName}
                        </option>
                      );
                    })}
                  </select>
                  <div className="invalid-feedback">
                    Please Enter Receiver Name
                  </div>
                </div>

                <label>Account Number</label>
                <div className="input-group mb-3">
                  <input
                    id="receiverAccountNo"
                    name="accountNo"
                    type="text"
                    value={receiver.accountNo}
                    className="form-control"
                    placeholder="Account Number"
                    readOnly
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
                    type="number"
                    onChange={handleChange}
                    value={transaction.amount}
                    className="form-control"
                    required
                  />
                  <div className="invalid-feedback">Please Enter Amount</div>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="invalidCheck"
                    required
                  />
                  <label className="form-check-label" htmlFor="invalidCheck">
                    Are you sure to continue transaction
                  </label>
                  <div className="invalid-feedback">
                    Check the box to continue
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="transfer-btn"
                variant="primary" 
              >
                Transfer
              </Button>
            </form>
          </div>
          <div className="spanner">
            <div className="spanner-content">
            <div className="loader"></div>
            <p>Transaction in process...</p>
            </div>
          </div>
          <div className="collapse container-fluid" id="collapseTransaction">
            <Table bordered responsive="sm" >
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Narration</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((transaction, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.narration}</td>
                      <td
                        style={
                          transaction.type === "debit"
                            ? { color: "red" }
                            : { color: "green" }
                        }
                      >
                        {transaction.amount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserDetail;
