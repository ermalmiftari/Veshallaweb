const Member = require("../models/memberModel");

exports.getMembers = (req, res) => {
  const members = Member.getAll();
  res.json(members);
};

exports.getMemberById = (req, res) => {
  const id = Number(req.params.id);
  const member = Member.getById(id);

  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }

  res.json(member);
};

exports.createMember = (req, res) => {
  const { emri, mbiemri, adresa, email, phone } = req.body;

  if (!emri || !mbiemri || !adresa || !email || !phone) {
    return res.status(400).json({
      error: "emri, mbiemri, adresa, email and phone are required"
    });
  }

  const newMember = Member.create(req.body);
  res.status(201).json(newMember);
};

exports.updateMember = (req, res) => {
  const id = Number(req.params.id);
  const updated = Member.update(id, req.body);

  if (!updated) {
    return res.status(404).json({ error: "Member not found" });
  }

  res.json(updated);
};

exports.deleteMember = (req, res) => {
  const id = Number(req.params.id);
  const removed = Member.remove(id);

  if (!removed) {
    return res.status(404).json({ error: "Member not found" });
  }

  res.json({ message: "Member deleted", removed });
};
