const express = require("express");
const router = express.Router();
const googleSsoCtrl = require("../controllers/google-sso");

router.get('/auth/google', googleSsoCtrl.auth);
router.get('auth/google/callback', googleSsoCtrl.callback);

module.exports = router;