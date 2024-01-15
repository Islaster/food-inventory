const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const googleSheets = require("./routes/google-sheets");
const passport = require('passport');
// Path to your JSON key file
//const KEYFILEPATH = "./service-account-keyfile.json";

app.use(cors());
app.use(express.json());
app.use("/", googleSheets)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
