const express = require("express");
const router = express.Router();
const notaController = require("../controllers/notaController");
const authMiddleware = require("../middleware/authMiddleware");

// Rotas para PROFESSOR e ADM gerenciar notas
router.post("/", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), notaController.createNota);
router.get("/", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), notaController.getAllNotas);
router.get("/aluno/:aluno_id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR", "ALUNO"]), notaController.getNotasByAluno);
router.put("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), notaController.updateNota);
router.delete("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), notaController.deleteNota);

module.exports = router;


