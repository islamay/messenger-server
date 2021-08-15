const express = require("express");
const roomController = require("../controllers/room.controller");
const router = express.Router();

router.get("/get/:id", roomController.getRoom)

router.post("/private/create", roomController.createPrivateRoom);

module.exports = router;
