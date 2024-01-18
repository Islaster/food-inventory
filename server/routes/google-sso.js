const express = require("express");
const router = express.Router();
const googleSsoCtrl = require("../controllers/googleSsoControllers");

router.get("/signin", googleSsoCtrl.login);
router.post("/signup", googleSsoCtrl.signup);

module.exports = router;
