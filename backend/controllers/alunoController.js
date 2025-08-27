const pool = require("../db");

// Criar um novo aluno (apenas para ADM)
exports.createAluno = async (req, res) => {
    const { nome, matricula, email, telefone, usuario_id } = req.body;
    try {
        const [result] = await pool.execute(
            "INSERT INTO alunos (nome, matricula, email, telefone, usuario_id) VALUES (?, ?, ?, ?, ?)",
            [nome, matricula, email, telefone, usuario_id]
        );
        res.status(201).json({ message: "Aluno criado com sucesso!", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar aluno." });
    }
};

// Obter todos os alunos (ADM e PROFESSOR)
exports.getAllAlunos = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM alunos");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar alunos." });
    }
};

// Obter um aluno por ID (ADM e PROFESSOR)
exports.getAlunoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.execute("SELECT * FROM alunos WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Aluno não encontrado." });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar aluno." });
    }
};

// Atualizar um aluno (apenas para ADM)
exports.updateAluno = async (req, res) => {
    const { id } = req.params;
    const { nome, matricula, email, telefone, usuario_id } = req.body;
    try {
        const [result] = await pool.execute(
            "UPDATE alunos SET nome = ?, matricula = ?, email = ?, telefone = ?, usuario_id = ? WHERE id = ?",
            [nome, matricula, email, telefone, usuario_id, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Aluno não encontrado." });
        }
        res.json({ message: "Aluno atualizado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar aluno." });
    }
};

// Deletar um aluno (apenas para ADM)
exports.deleteAluno = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute("DELETE FROM alunos WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Aluno não encontrado." });
        }
        res.json({ message: "Aluno deletado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar aluno." });
    }
};


