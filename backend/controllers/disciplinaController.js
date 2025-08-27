const pool = require("../db");

// Criar uma nova disciplina (apenas para ADM)
exports.createDisciplina = async (req, res) => {
    const { nome, carga_horaria } = req.body;
    try {
        const [result] = await pool.execute(
            "INSERT INTO disciplinas (nome, carga_horaria) VALUES (?, ?)",
            [nome, carga_horaria]
        );
        res.status(201).json({ message: "Disciplina criada com sucesso!", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar disciplina." });
    }
};

// Obter todas as disciplinas (ADM e PROFESSOR)
exports.getAllDisciplinas = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM disciplinas");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar disciplinas." });
    }
};

// Obter uma disciplina por ID (ADM e PROFESSOR)
exports.getDisciplinaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.execute("SELECT * FROM disciplinas WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Disciplina não encontrada." });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar disciplina." });
    }
};

// Atualizar uma disciplina (apenas para ADM)
exports.updateDisciplina = async (req, res) => {
    const { id } = req.params;
    const { nome, carga_horaria } = req.body;
    try {
        const [result] = await pool.execute(
            "UPDATE disciplinas SET nome = ?, carga_horaria = ? WHERE id = ?",
            [nome, carga_horaria, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Disciplina não encontrada." });
        }
        res.json({ message: "Disciplina atualizada com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar disciplina." });
    }
};

// Deletar uma disciplina (apenas para ADM)
exports.deleteDisciplina = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute("DELETE FROM disciplinas WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Disciplina não encontrada." });
        }
        res.json({ message: "Disciplina deletada com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar disciplina." });
    }
};

// Adicionar disciplina a uma turma (apenas para ADM)
exports.addDisciplinaToTurma = async (req, res) => {
    const { turma_id, disciplina_id } = req.body;
    try {
        const [result] = await pool.execute(
            "INSERT INTO turmas_disciplinas (turma_id, disciplina_id) VALUES (?, ?)",
            [turma_id, disciplina_id]
        );
        res.status(201).json({ message: "Disciplina adicionada à turma com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao adicionar disciplina à turma." });
    }
};

// Remover disciplina de uma turma (apenas para ADM)
exports.removeDisciplinaFromTurma = async (req, res) => {
    const { turma_id, disciplina_id } = req.body;
    try {
        const [result] = await pool.execute(
            "DELETE FROM turmas_disciplinas WHERE turma_id = ? AND disciplina_id = ?",
            [turma_id, disciplina_id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Disciplina não encontrada nesta turma." });
        }
        res.json({ message: "Disciplina removida da turma com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover disciplina da turma." });
    }
};

// Obter disciplinas de uma turma (ADM e PROFESSOR)
exports.getDisciplinasByTurma = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.execute(
            "SELECT d.* FROM disciplinas d JOIN turmas_disciplinas td ON d.id = td.disciplina_id WHERE td.turma_id = ?",
            [id]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar disciplinas da turma." });
    }
};


