const express = require("express");
const roomController = require("../controllers/room.controller");
const router = express.Router();

router.post("/get", roomController.getRoom)

router.post("/private/create", roomController.createPrivateRoom);

module.exports = router;
