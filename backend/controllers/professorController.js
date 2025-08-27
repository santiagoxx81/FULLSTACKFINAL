const pool = require("../db");

// Criar um novo professor (apenas para ADM)
exports.createProfessor = async (req, res) => {
    const { nome, email, telefone, usuario_id } = req.body;
    try {
        const [result] = await pool.execute(
            "INSERT INTO professores (nome, email, telefone, usuario_id) VALUES (?, ?, ?, ?)",
            [nome, email, telefone, usuario_id]
        );
        res.status(201).json({ message: "Professor criado com sucesso!", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar professor." });
    }
};

// Obter todos os professores (ADM e PROFESSOR)
exports.getAllProfessores = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM professores");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar professores." });
    }
};

// Obter um professor por ID (ADM e PROFESSOR)
exports.getProfessorById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.execute("SELECT * FROM professores WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Professor não encontrado." });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar professor." });
    }
};

// Atualizar um professor (apenas para ADM)
exports.updateProfessor = async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, usuario_id } = req.body;
    try {
        const [result] = await pool.execute(
            "UPDATE professores SET nome = ?, email = ?, telefone = ?, usuario_id = ? WHERE id = ?",
            [nome, email, telefone, usuario_id, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Professor não encontrado." });
        }
        res.json({ message: "Professor atualizado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar professor." });
    }
};

// Deletar um professor (apenas para ADM)
exports.deleteProfessor = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute("DELETE FROM professores WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Professor não encontrado." });
        }
        res.json({ message: "Professor deletado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar professor." });
    }
};


