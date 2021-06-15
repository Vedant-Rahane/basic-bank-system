const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
          number: String,
          exp: String,
          cvv: String,
        });

const transactionSchema = new mongoose.Schema({
  amount: { type: String, required: true },
  date: { type: String, required: true },
  narration: { type: String, required: true },
  type: { type: String, required: true },
});

const userSchema = new mongoose.Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    gender: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    accountType: { type: String, required: true },
    accountNo: { type: String, required: true },
    currentBal: String,
    creditCard: cardSchema ,
    accountHistory: [transactionSchema],
  }
);

module.exports = mongoose.model("User", userSchema);
