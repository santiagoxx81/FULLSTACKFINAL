const pool = require("../db");

// Criar uma nova turma (apenas para ADM)
exports.createTurma = async (req, res) => {
    const { nome, periodo, professor_id } = req.body;
    try {
        const [result] = await pool.execute(
            "INSERT INTO turmas (nome, periodo, professor_id) VALUES (?, ?, ?)",
            [nome, periodo, professor_id]
        );
        res.status(201).json({ message: "Turma criada com sucesso!", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar turma." });
    }
};

// Obter todas as turmas (ADM e PROFESSOR)
exports.getAllTurmas = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT t.*, p.nome as professor_nome FROM turmas t LEFT JOIN professores p ON t.professor_id = p.id");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar turmas." });
    }
};

// Obter uma turma por ID (ADM e PROFESSOR)
exports.getTurmaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.execute("SELECT t.*, p.nome as professor_nome FROM turmas t LEFT JOIN professores p ON t.professor_id = p.id WHERE t.id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Turma não encontrada." });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar turma." });
    }
};

// Atualizar uma turma (apenas para ADM)
exports.updateTurma = async (req, res) => {
    const { id } = req.params;
    const { nome, periodo, professor_id } = req.body;
    try {
        const [result] = await pool.execute(
            "UPDATE turmas SET nome = ?, periodo = ?, professor_id = ? WHERE id = ?",
            [nome, periodo, professor_id, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Turma não encontrada." });
        }
        res.json({ message: "Turma atualizada com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar turma." });
    }
};

// Deletar uma turma (apenas para ADM)
exports.deleteTurma = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute("DELETE FROM turmas WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Turma não encontrada." });
        }
        res.json({ message: "Turma deletada com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar turma." });
    }
};

// Adicionar aluno a uma turma (apenas para ADM)
exports.addAlunoToTurma = async (req, res) => {
    const { turma_id, aluno_id } = req.body;
    try {
        const [result] = await pool.execute(
            "INSERT INTO alunos_turmas (turma_id, aluno_id) VALUES (?, ?)",
            [turma_id, aluno_id]
        );
        res.status(201).json({ message: "Aluno adicionado à turma com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao adicionar aluno à turma." });
    }
};

// Remover aluno de uma turma (apenas para ADM)
exports.removeAlunoFromTurma = async (req, res) => {
    const { turma_id, aluno_id } = req.body;
    try {
        const [result] = await pool.execute(
            "DELETE FROM alunos_turmas WHERE turma_id = ? AND aluno_id = ?",
            [turma_id, aluno_id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Aluno não encontrado nesta turma." });
        }
        res.json({ message: "Aluno removido da turma com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover aluno da turma." });
    }
};

// Obter alunos de uma turma (ADM e PROFESSOR)
exports.getAlunosByTurma = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.execute(
            "SELECT a.* FROM alunos a JOIN alunos_turmas at ON a.id = at.aluno_id WHERE at.turma_id = ?",
            [id]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar alunos da turma." });
    }
};


