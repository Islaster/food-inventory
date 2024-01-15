const { google } = require("googleapis");
const KEYFILEPATH = "../keyfile.json";

const auth = new google.auth.JWT(
  require(KEYFILEPATH).client_email,
  null,
  require(KEYFILEPATH).private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

auth.authorize((err, tokens) => {
  if (err) {
    console.log(err);
    return;
  }
});

module.exports = auth;
