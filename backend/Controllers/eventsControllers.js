const { Admin, Event, EventUser } = require("../Models/adminModel");
const User = require("../Models/userModel");

exports.createEvent = async (req, res) => {
  try {
    const {
      createdBy,
      title,
      startTime,
      finishTime,
      studentsLimit,
      registeredUsers,
      summary,
    } = req.body;

    const event = await Event.create({
      createdBy,
      title,
      startTime,
      finishTime,
      studentsLimit,
      summary,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);

    if (!event || event.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.destroy();
    await EventUser.destroy({ where: { EventId: eventId } });
    res.status(204).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getEventsForAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const events = await Event.findAll({ where: { createdBy: adminId } });

    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ message: "there are zero events for that Admin" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error("Error getting event by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.fillEventWithUser = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const user = await User.findByPk(userId);
    const event = await Event.findByPk(eventId);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    if (!event) {
      return res.status(404).json({ error: "event not found" });
    }
    const userInEvent = await EventUser.create({
      eventId,
      userId,
    });

    res.status(200).json(userInEvent);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUsersInEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
  
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      const usersIn = await EventUser.findAll({
        where: { EventId: eventId },
        attributes: ["UserId"],
      });
  
      const fullUsersIn = await Promise.all(
        usersIn.map(async (userId) => {
          const user = await User.findByPk(userId);
          return user;
        })
      );
  
      res.status(200).json({ eventTitle: event.title, fullUsersIn });
    } catch (error) {
      console.error("Error fetching event registered users:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
