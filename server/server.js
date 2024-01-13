const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const auth = require("./config/google-sheets");
const googleSheets = require("./routes/google-sheets");
// Path to your JSON key file
//const KEYFILEPATH = "./service-account-keyfile.json";

app.use(cors());
app.use(express.json());
app.use("/", googleSheets)



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
