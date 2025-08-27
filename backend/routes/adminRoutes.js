const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const professorController = require("../controllers/professorController");

// Rota de exemplo para o dashboard do ADM
router.get("/dashboard", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), (req, res) => {
    res.json({ message: "Bem-vindo ao dashboard do administrador!", user: req.user });
});

// Rotas para ADM gerenciar usuários (reutilizando userController)
router.get("/users", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), userController.getAllUsers);
router.get("/users/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), userController.getUserById);
router.put("/users/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), userController.updateUser);
router.delete("/users/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), userController.deleteUser);
router.put("/users/:id/status", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), userController.toggleUserStatus);

// Rotas para ADM gerenciar professores (reutilizando professorController)
router.post("/professores", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), professorController.createProfessor);
router.get("/professores", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), professorController.getAllProfessores);
router.get("/professores/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), professorController.getProfessorById);
router.put("/professores/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), professorController.updateProfessor);
router.delete("/professores/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), professorController.deleteProfessor);

module.exports = router;


