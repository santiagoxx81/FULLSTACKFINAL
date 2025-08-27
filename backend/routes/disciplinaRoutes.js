const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");
const authMiddleware = require("../middleware/authMiddleware");

// Rotas para ADM gerenciar disciplinas
router.post("/", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), disciplinaController.createDisciplina);
router.get("/", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), disciplinaController.getAllDisciplinas);
router.get("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), disciplinaController.getDisciplinaById);
router.put("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), disciplinaController.updateDisciplina);
router.delete("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), disciplinaController.deleteDisciplina);

// Rotas para gerenciar disciplinas em turmas
router.post("/add-turma", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), disciplinaController.addDisciplinaToTurma);
router.post("/remove-turma", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), disciplinaController.removeDisciplinaFromTurma);
router.get("/:id/turmas", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), disciplinaController.getDisciplinasByTurma);

module.exports = router;


