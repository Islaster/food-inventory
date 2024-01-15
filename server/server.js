const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const googleSheets = require("./routes/google-sheets");
const passport = require('passport');
const googleSso = require("./routes/google-sso");
const { OAuth2Client } = require("google-auth-library");
// Path to your JSON key file
//const KEYFILEPATH = "./service-account-keyfile.json";

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.use(express.json());
app.use("/", googleSheets)
app.use("/", googleSso)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
require("./config/google-sso");


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
