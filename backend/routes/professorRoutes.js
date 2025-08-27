const express = require("express");
const router = express.Router();
const professorController = require("../controllers/professorController");
const authMiddleware = require("../middleware/authMiddleware");

// Rotas para ADM gerenciar professores
router.post("/", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), professorController.createProfessor);
router.get("/", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), professorController.getAllProfessores);
router.get("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), professorController.getProfessorById);
router.put("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), professorController.updateProfessor);
router.delete("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), professorController.deleteProfessor);

module.exports = router;


