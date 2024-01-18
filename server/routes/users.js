const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  login,
  isAdmin,
} = require("../controllers/userControllers");

router.get("/user/all", isAdmin, getUsers);
router.post("/user/create", createUser);
router.get("/user/:id", getUser);
router.get("/user/delete", deleteUser);
router.post("/user/login", login);

module.exports = router;
