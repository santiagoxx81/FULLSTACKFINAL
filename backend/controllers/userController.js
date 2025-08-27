const pool = require("../db");
const bcrypt = require("bcrypt");

// Obter todos os usuários (apenas para ADM)
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT id, usuario, perfil, ativo FROM usuarios");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar usuários." });
    }
};

// Obter um usuário por ID (apenas para ADM)
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.execute("SELECT id, usuario, perfil, ativo FROM usuarios WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar usuário." });
    }
};

// Atualizar um usuário (apenas para ADM)
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { usuario, perfil, ativo, senha } = req.body;
    try {
        let sql = "UPDATE usuarios SET usuario = ?, perfil = ?, ativo = ? WHERE id = ?";
        let params = [usuario, perfil, ativo, id];

        if (senha) {
            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(senha, salt);
            sql = "UPDATE usuarios SET usuario = ?, perfil = ?, ativo = ?, senha = ? WHERE id = ?";
            params = [usuario, perfil, ativo, senhaHash, id];
        }

        const [result] = await pool.execute(sql, params);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
};

// Deletar um usuário (apenas para ADM)
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute("DELETE FROM usuarios WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar usuário." });
    }
};

// Ativar/Desativar usuário (apenas para ADM)
exports.toggleUserStatus = async (req, res) => {
    const { id } = req.params;
    const { ativo } = req.body;
    try {
        const [result] = await pool.execute("UPDATE usuarios SET ativo = ? WHERE id = ?", [ativo, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json({ message: `Usuário ${ativo ? 'ativado' : 'desativado'} com sucesso!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao alterar status do usuário." });
    }
};


