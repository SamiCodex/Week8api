const express = require("express");
const c = require("../controllers/studentController");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

router.get("/", c.getAll);
router.get("/:id", c.getOne);

router.post("/", auth, c.createStudent);
router.patch("/:id", auth, c.updateStudent);
router.delete("/:id", auth, requireRole("admin"), c.deleteStudent);

module.exports = router;

