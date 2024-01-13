const express = require("express");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { google } = require("googleapis");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Path to your JSON key file
//const KEYFILEPATH = "./service-account-keyfile.json";
const KEYFILEPATH = "./test-keyfile.json";

// ID of your Google Sheet
const SPREADSHEETID = process.env.SPREADSHEETID;

// Configure a JWT auth client
const auth = new google.auth.JWT(
  require(KEYFILEPATH).client_email,
  null,
  require(KEYFILEPATH).private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const sheets = google.sheets({ version: "v4", auth });
const doc = new GoogleSpreadsheet(SPREADSHEETID, auth);
doc.loadInfo();

// Authenticate request
auth.authorize((err, tokens) => {
  if (err) {
    console.log(err);
    return;
  }
});
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    // Make an authorized request to read data from the sheet
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: SPREADSHEETID,
      range: "A:Z",
    });

    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/create", async (req, res) => {
  try {
    doc.loadInfo();
    const data = [];
    for (key in req.body) {
      data.push({ key });
    }
    const response = await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: SPREADSHEETID,
      range: "A:Z",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [req.body],
      },
    });
    res.send("Data added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete", async (req, res) => {
  doc.loadInfo();
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEETID,
    resource: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: process.env.SHEETID,
              dimension: "ROWS",
              startIndex: req.body.index,
              endIndex: req.body.index + 1,
            },
          },
        },
      ],
    },
  });
  res.send("Deleted Successfully");
});

app.post("/update", async (req, res) => {
  doc.loadInfo();
  await sheets.spreadsheets.values.update({
    auth,
    spreadsheetId: SPREADSHEETID,
    range: `A${req.body.index + 1}`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        [
          req.body.idItem,
          req.body.name,
          req.body.type,
          req.body.qty,
          req.body.price,
          req.body.location,
          req.body.date,
        ],
      ],
    },
  });
});

app.get("/CHILA", async (req, res) => {
  try {
    // Make an authorized request to read data from the sheet
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: "1YBK6djehtz57QLf1c-y6YFudFXjRK7_zsAJduozfNU4",
      range: "A6:Z", // Update this to your sheet's name
    });

    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
