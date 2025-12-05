// controllers/memberController.js
const Member = require("../models/memberModel");

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.getAll();
    res.json(members);
  } catch (err) {
    console.error("Error getting members:", err);
    res.status(500).json({ error: "Failed to fetch members" });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const member = await Member.getById(id);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json(member);
  } catch (err) {
    console.error("Error getting member by id:", err);
    res.status(500).json({ error: "Failed to fetch member" });
  }
};

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

    // TEMP: make the error visible so you see exactly what MySQL complains about
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "A member with this email or membership code already exists",
        code: err.code,
      });
    }

    return res.status(500).json({
      error: "Failed to create member",
      code: err.code,
      message: err.message,
      sqlMessage: err.sqlMessage,
    });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updated = await Member.update(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating member:", err);
    res.status(500).json({ error: "Failed to update member" });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const removed = await Member.remove(id);

    if (!removed) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json({ message: "Member deleted", removed });
  } catch (err) {
    console.error("Error deleting member:", err);
    res.status(500).json({ error: "Failed to delete member" });
  }
};
