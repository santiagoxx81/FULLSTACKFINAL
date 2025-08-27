const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Rotas para ADM gerenciar usuários
router.get("/", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), userController.getAllUsers);
router.get("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), userController.getUserById);
router.put("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), userController.updateUser);
router.delete("/:id", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), userController.deleteUser);
router.put("/:id/status", authMiddleware.verifyToken, authMiddleware.verifyPerfil(["ADM"]), userController.toggleUserStatus);

module.exports = router;


