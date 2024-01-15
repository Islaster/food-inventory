const express = require("express");
const router = express.Router();
const googleSsoCtrl = require("../controllers/google-sso");

router.get("signin", googleSsoCtrl.login);
router.get("signup", googleSsoCtrl.signup);

module.exports = router;
