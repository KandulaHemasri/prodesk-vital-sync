import Appointment from "../models/Appointment.js";


// CREATE APPOINTMENT
export const createAppointment = async (req, res) => {
  try {
    console.log("USER:", req.user);  
    console.log("BODY:", req.body);

    const { doctorName, date, time, reason } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!doctorName || !date || !time) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const appointment = await Appointment.create({
      userId: req.user.id, 
      doctorName,
      date,
      time,
      reason: reason || "Consultation", 
    });

    res.status(201).json(appointment);

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};



// GET ALL APPOINTMENTS (ONLY USER'S DATA)
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
  userId: req.user.id,
}).sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// UPDATE APPOINTMENT
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // ownership check
    if (appointment.userId.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// DELETE APPOINTMENT
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    //  ownership check
    if (appointment.userId.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await appointment.deleteOne();

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//  GET BOOKED SLOTS (FOR SLOT BLOCKING)
export const getBookedSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    const appointments = await Appointment.find({
      doctorId,
      date,
    });

    // return only booked times
    const slots = appointments.map((appt) => appt.time);

    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};