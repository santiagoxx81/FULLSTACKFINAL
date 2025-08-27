const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");
const authMiddleware = require("../middleware/authMiddleware");

// Rotas para ADM gerenciar alunos
router.post("/", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), alunoController.createAluno);
router.get("/", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), alunoController.getAllAlunos);
router.get("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), alunoController.getAlunoById);
router.put("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), alunoController.updateAluno);
router.delete("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), alunoController.deleteAluno);

module.exports = router;


