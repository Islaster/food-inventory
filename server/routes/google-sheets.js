const express = require("express");
const router = express.Router();
const googleCtrl = require("../controllers/google-sheets");

//get google sheet
router.get("/", googleCtrl.index);

//create row in google sheet
router.post("/create", googleCtrl.create);

//update row in google sheet
router.put("/update", googleCtrl.update);

//delete row in google sheet
router.delete("/delete", googleCtrl.delete);

module.exports = router;