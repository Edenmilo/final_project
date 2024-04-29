const express = require("express");
const router = express.Router();
const {
  createEvent,
  deleteEvent,
  getEventsForAdmin,
  fillEventWithUser,
  getUsersInEvent,
  editEvent,
  getEvent,
} = require("../Controllers/eventsControllers");

router.post("/create", createEvent);
router.get("/:adminId", getEventsForAdmin);
router.post("/newmatch", fillEventWithUser);
router.get("/usersfor/:eventId", getUsersInEvent);
router.delete("/delete/:eventId", deleteEvent);
router.put("/update/:eventId", editEvent);
router.get("/getEvent/:eventId", getEvent);

module.exports = router;
