const pool = require("../db");

// Registrar frequência (apenas para PROFESSOR e ADM)
exports.createFrequencia = async (req, res) => {
    const { aluno_id, disciplina_id, turma_id, data_aula, presente } = req.body;
    try {
        const [result] = await pool.execute(
            "INSERT INTO frequencia (aluno_id, disciplina_id, turma_id, data_aula, presente) VALUES (?, ?, ?, ?, ?)",
            [aluno_id, disciplina_id, turma_id, data_aula, presente]
        );
        res.status(201).json({ message: "Frequência registrada com sucesso!", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao registrar frequência." });
    }
};

// Obter todas as frequências (ADM e PROFESSOR)
exports.getAllFrequencias = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT f.*, a.nome as aluno_nome, d.nome as disciplina_nome, t.nome as turma_nome FROM frequencia f JOIN alunos a ON f.aluno_id = a.id JOIN disciplinas d ON f.disciplina_id = d.id JOIN turmas t ON f.turma_id = t.id");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar frequências." });
    }
};

// Obter frequência por aluno (ADM, PROFESSOR e ALUNO)
exports.getFrequenciaByAluno = async (req, res) => {
    const { aluno_id } = req.params;
    try {
        const [rows] = await pool.execute("SELECT f.*, d.nome as disciplina_nome, t.nome as turma_nome FROM frequencia f JOIN disciplinas d ON f.disciplina_id = d.id JOIN turmas t ON f.turma_id = t.id WHERE f.aluno_id = ?", [aluno_id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar frequência do aluno." });
    }
};

// Atualizar uma frequência (apenas para PROFESSOR e ADM)
exports.updateFrequencia = async (req, res) => {
    const { id } = req.params;
    const { data_aula, presente } = req.body;
    try {
        const [result] = await pool.execute(
            "UPDATE frequencia SET data_aula = ?, presente = ? WHERE id = ?",
            [data_aula, presente, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro de frequência não encontrado." });
        }
        res.json({ message: "Frequência atualizada com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar frequência." });
    }
};

// Deletar uma frequência (apenas para ADM)
exports.deleteFrequencia = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute("DELETE FROM frequencia WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro de frequência não encontrado." });
        }
        res.json({ message: "Frequência deletada com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar frequência." });
    }
};


