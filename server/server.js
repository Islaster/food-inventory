const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const googleSheets = require("./routes/google-sheets");
const googleSso = require("./routes/google-sso");
const users = require("./routes/users");
const config = require("./database/firestore");
const firebase = require("firebase-admin");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

app.use(express.json());
//routes
app.use("/", googleSheets);
app.use("/", googleSso);
app.use("/", users);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
