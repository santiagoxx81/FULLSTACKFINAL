const express = require("express");
const router = express.Router();
const frequenciaController = require("../controllers/frequenciaController");
const authMiddleware = require("../middleware/authMiddleware");

// Rotas para PROFESSOR e ADM gerenciar frequência
router.post("/", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), frequenciaController.createFrequencia);
router.get("/", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), frequenciaController.getAllFrequencias);
router.get("/aluno/:aluno_id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR", "ALUNO"]), frequenciaController.getFrequenciaByAluno);
router.put("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM", "PROFESSOR"]), frequenciaController.updateFrequencia);
router.delete("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), frequenciaController.deleteFrequencia);

module.exports = router;


