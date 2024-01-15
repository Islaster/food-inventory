const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const googleSheets = require("./routes/google-sheets");
const googleSso = require("./routes/google-sso");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.use(express.json());
app.use("/", googleSheets);
app.use("/", googleSso);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
