const pool = require("../db");

// Criar uma nova nota (apenas para PROFESSOR e ADM)
exports.createNota = async (req, res) => {
    const { aluno_id, disciplina_id, turma_id, nota } = req.body;
    try {
        const [result] = await pool.execute(
            "INSERT INTO notas (aluno_id, disciplina_id, turma_id, nota) VALUES (?, ?, ?, ?)",
            [aluno_id, disciplina_id, turma_id, nota]
        );
        res.status(201).json({ message: "Nota lançada com sucesso!", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao lançar nota." });
    }
};

// Obter todas as notas (ADM e PROFESSOR)
exports.getAllNotas = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT n.*, a.nome as aluno_nome, d.nome as disciplina_nome, t.nome as turma_nome FROM notas n JOIN alunos a ON n.aluno_id = a.id JOIN disciplinas d ON n.disciplina_id = d.id JOIN turmas t ON n.turma_id = t.id");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar notas." });
    }
};

// Obter notas por aluno (ADM, PROFESSOR e ALUNO)
exports.getNotasByAluno = async (req, res) => {
    const { aluno_id } = req.params;
    try {
        const [rows] = await pool.execute("SELECT n.*, d.nome as disciplina_nome, t.nome as turma_nome FROM notas n JOIN disciplinas d ON n.disciplina_id = d.id JOIN turmas t ON n.turma_id = t.id WHERE n.aluno_id = ?", [aluno_id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar notas do aluno." });
    }
};

// Atualizar uma nota (apenas para PROFESSOR e ADM)
exports.updateNota = async (req, res) => {
    const { id } = req.params;
    const { nota } = req.body;
    try {
        const [result] = await pool.execute(
            "UPDATE notas SET nota = ? WHERE id = ?",
            [nota, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Nota não encontrada." });
        }
        res.json({ message: "Nota atualizada com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar nota." });
    }
};

// Deletar uma nota (apenas para ADM)
exports.deleteNota = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute("DELETE FROM notas WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Nota não encontrada." });
        }
        res.json({ message: "Nota deletada com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar nota." });
    }
};


