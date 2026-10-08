const Student = require("../models/Student");

exports.getAll = async (req, res) => {
  try {
    const { major, sort, limit } = req.query;
    
    const filter = {};
    if (major) filter.major = major;

    const students = await Student
      .find(filter)
      .sort(sort || "name")
      .limit(Number(limit) || 20);

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const created = await Student.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const gone = await Student.findByIdAndDelete(req.params.id);
    if (!gone) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
};

