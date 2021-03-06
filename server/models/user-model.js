const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    image: { type: String, required: true },
    accountNo: { type: String, required: true },
    emailId: { type: String, required: true },
    currentBal: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
