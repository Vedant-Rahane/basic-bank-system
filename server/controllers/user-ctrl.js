const User = require("../models/user-model");

getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res.status(404).json({ success: false, error: `Users not found` });
    }
    return res.status(200).json({ success: true, data: users });
  }).catch((err) => console.log(err));
};

updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  const amount = parseInt(body.amount);
  let senderDetail = {
    name: "",
    accNo: "",
  };
  
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }

    senderDetail = {
      name: user.fName + " " + user.lName,
      accNo: user.accountNo,
    };

    const strBalanceSender = user.currentBal;
    const numBalanceSender = Number(strBalanceSender.replace(/[^0-9.-]+/g, ""));
    const newBalanceSender = numBalanceSender - amount;

    user.currentBal = newBalanceSender.toLocaleString("en-US", {
      style: "currency",
      currency: "inr",
      minimumFractionDigits: 2,
    });

    const sendersTransactions = user.accountHistory;

    sendersTransactions.unshift({
      type: "debit",
      amount: body.amount,
      narration:
        "To -" + body.receiverName + " / Account No. :" + body.receiverAccountNo,
      date: new Date().toLocaleString(),
    });

    user.accountHistory = sendersTransactions;

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "User not updated!",
        });
      });
  });

  User.findOne({ _id: body.receiverId }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    if (user) {
      const strBalanceReceiver = user.currentBal;
      const numBalanceReceiver = Number(
        strBalanceReceiver.replace(/[^0-9.-]+/g, "")
      );
      const newBalanceReceiver = numBalanceReceiver + amount;

      user.currentBal = newBalanceReceiver.toLocaleString("en-US", {
        style: "currency",
        currency: "inr",
        minimumFractionDigits: 2,
      });

      const receiversTransactions = user.accountHistory;

      receiversTransactions.unshift({
          type: "credit",
          amount: body.amount,
          narration:
            "From -" + senderDetail.name + " / Account No. :" + senderDetail.accNo,
          date: new Date().toLocaleString(),
        });

        user.accountHistory = receiversTransactions;

      user
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: user._id,
            message: "User updated!",
          });
        })
        .catch((error) => {
          return res.status(404).json({
            error,
            message: "User not updated!",
          });
        });
    }
  });

  // User.updateOne(
  //   { _id: req.params.id },
  //   { $set: { currentBal: body.amount } },
  //   function (err) {
  //     if (err) {
  //       return res.status(404).json({
  //         err,
  //         message: "User not updated!",
  //       });
  //     } else {
  //       return res.status(200).json({
  //         success: true,
  //         id: req.params.id,
  //         message: "User updated!",
  //       });
  //     }
  //   }
  // );
};


module.exports = {
  getUsers,
  getUserById,
  updateUser,
};
