// controllers/memberController.js
const Member = require("../models/memberModel");

// GET /api/members
async function getMembers(req, res) {
  try {
    const members = await Member.getAll();
    return res.json(members);
  } catch (err) {
    console.error("Error getting members:", err);
    return res.status(500).json({ error: "Failed to fetch members" });
  }
}

// GET /api/members/:id
async function getMemberById(req, res) {
  try {
    const id = Number(req.params.id);
    const member = await Member.getById(id);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    return res.json(member);
  } catch (err) {
    console.error("Error getting member by id:", err);
    return res.status(500).json({ error: "Failed to fetch member" });
  }
}

// POST /api/members
async function createMember(req, res) {
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

    // Detailed error for debugging
    return res.status(500).json({
      error: "Failed to create member",
      code: err.code,
      message: err.message,
      sqlMessage: err.sqlMessage,
    });
  }
}

// PUT /api/members/:id
async function updateMember(req, res) {
  try {
    const id = Number(req.params.id);
    const updated = await Member.update(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Member not found" });
    }

    return res.json(updated);
  } catch (err) {
    console.error("Error updating member:", err);
    return res.status(500).json({ error: "Failed to update member" });
  }
}

// DELETE /api/members/:id
async function deleteMember(req, res) {
  try {
    const id = Number(req.params.id);
    const removed = await Member.remove(id);

    if (!removed) {
      return res.status(404).json({ error: "Member not found" });
    }

    return res.json({ message: "Member deleted", removed });
  } catch (err) {
    console.error("Error deleting member:", err);
    return res.status(500).json({ error: "Failed to delete member" });
  }
}

// Export all controller functions
module.exports = {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
