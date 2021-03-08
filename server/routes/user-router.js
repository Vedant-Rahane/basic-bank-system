const express = require("express");

const UserCtrl = require("../controllers/user-ctrl");

const router = express.Router();

router.get("/user/:id", UserCtrl.getUserById);
router.get("/users", UserCtrl.getUsers);
router.patch("/user/:id", UserCtrl.updateUser);

module.exports = router;
