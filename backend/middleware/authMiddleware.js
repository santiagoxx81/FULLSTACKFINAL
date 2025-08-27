const jwt = require("jsonwebtoken");
const pool = require("../db");

exports.verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("Um token é necessário para autenticação");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Token inválido");
    }
    return next();
};

exports.verifyPerfil = (perfisPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !req.user.perfil) {
            return res.status(403).send("Acesso negado: Perfil de usuário não encontrado.");
        }
        if (!perfisPermitidos.includes(req.user.perfil)) {
            return res.status(403).send("Acesso negado: Você não tem permissão para acessar esta rota.");
        }
        next();
    };
};


