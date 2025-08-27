const express = require("express");
const router = express.Router();
const turmaController = require("../controllers/turmaController");
const authMiddleware = require("../middleware/authMiddleware");

// Rotas para ADM gerenciar turmas
router.post("/", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), turmaController.createTurma);
router.get("/", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), turmaController.getAllTurmas);
router.get("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), turmaController.getTurmaById);
router.put("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), turmaController.updateTurma);
router.delete("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), turmaController.deleteTurma);

// Rotas para gerenciar alunos em turmas
router.post("/add-aluno", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), turmaController.addAlunoToTurma);
router.post("/remove-aluno", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), turmaController.removeAlunoFromTurma);
router.get("/:id/alunos", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), turmaController.getAlunosByTurma);

module.exports = router;


