// In-memory members
let members = [];
let nextMemberId = 1;

function getAll() {
  return members;
}

function getById(id) {
  return members.find((m) => m.id === id);
}

function create(data) {
  const {
    emri,
    mbiemri,
    adresa,
    email,
    phone,
    city,
    country,
    dateOfBirth,
    membershipType,
    notes
  } = data;

  const newMember = {
    id: nextMemberId++,
    emri,
    mbiemri,
    adresa,
    email,
    phone,
    city: city || "",
    country: country || "",
    dateOfBirth: dateOfBirth || null,
    membershipType: membershipType || "standard", // standard | premium | vip
    isActive: true,
    notes: notes || "",
    createdAt: new Date().toISOString()
  };

  members.push(newMember);
  return newMember;
}

function update(id, data) {
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return null;

  const existing = members[index];

  const updated = {
    ...existing,
    emri: data.emri ?? existing.emri,
    mbiemri: data.mbiemri ?? existing.mbiemri,
    adresa: data.adresa ?? existing.adresa,
    email: data.email ?? existing.email,
    phone: data.phone ?? existing.phone,
    city: data.city ?? existing.city,
    country: data.country ?? existing.country,
    dateOfBirth: data.dateOfBirth ?? existing.dateOfBirth,
    membershipType: data.membershipType ?? existing.membershipType,
    isActive:
      typeof data.isActive === "boolean" ? data.isActive : existing.isActive,
    notes: data.notes ?? existing.notes
  };

  members[index] = updated;
  return updated;
}

function remove(id) {
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return null;

  const removed = members[index];
  members.splice(index, 1);
  return removed;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
