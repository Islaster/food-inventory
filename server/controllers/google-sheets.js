module.exports={
    index,
    create,
    update,
    delete:deleteRow
}
const auth = require("../config/google-sheets");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { google } = require("googleapis");
const sheets = google.sheets({ version: "v4", auth });
// ID of your Google Sheet
const SPREADSHEETID = process.env.SPREADSHEETID;
const doc = new GoogleSpreadsheet(SPREADSHEETID, auth);
require("dotenv").config();
doc.loadInfo();

async function index(req, res){
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
  }

  async function create(req, res){
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
  }

  async function update(req, res){
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
  }

  async function deleteRow(req, res){
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
  }