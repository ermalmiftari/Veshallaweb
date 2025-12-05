// controllers/memberController.js
const Member = require("../models/memberModel");

exports.createMember = async (req, res) => {
  try {
    console.log("Incoming member body:", req.body);

    const { name, surname, phone, email, address, location } = req.body;

    if (!name || !surname || !phone || !email || !address || !location) {
      return res.status(400).json({
        error: "name, surname, phone, email, address and location are required",
      });
    }

    const newMember = await Member.create(req.body);
    return res.status(201).json(newMember);
  } catch (err) {
    console.error("Error creating member:", err);

    // TEMP: expose details so we can finally see the true problem
    return res.status(500).json({
      error: "Failed to create member",
      code: err.code,
      message: err.message,
      sqlMessage: err.sqlMessage,
    });
  }
};
