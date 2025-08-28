const pool = require('../config/db'); // seu pool mysql2/promise

module.exports = {
  async listarTurmas() {
    const [rows] = await pool.execute(
      'SELECT t.id, t.nome, t.periodo, p.nome AS professor FROM turmas t LEFT JOIN professores p ON p.id = t.professor_id ORDER BY t.nome'
    );
    return rows;
  },

  async listarAlunos() {
    const [rows] = await pool.execute(
      'SELECT id, nome, matricula FROM alunos ORDER BY nome'
    );
    return rows;
  },

  async listarVinculosPorTurma(turmaId) {
    const [rows] = await pool.execute(
      `SELECT a.id AS aluno_id, a.nome AS aluno_nome, a.matricula
       FROM turma_aluno ta
       JOIN alunos a ON a.id = ta.aluno_id
       WHERE ta.turma_id = ?
       ORDER BY a.nome`, [turmaId]
    );
    return rows;
  },

  async vincularPorAlunoId(turmaId, alunoId) {
    // evita duplicado
    await pool.execute(
      'INSERT IGNORE INTO turma_aluno (turma_id, aluno_id) VALUES (?, ?)',
      [turmaId, alunoId]
    );
  },

  async vincularPorMatricula(turmaId, matricula) {
    // chama a PROC criada no script SQL (ou faça manualmente)
    await pool.execute('CALL sp_vincular_aluno_turma_por_matricula(?, ?)', [turmaId, matricula]);
  },

  async removerVinculo(turmaId, alunoId) {
    await pool.execute(
      'DELETE FROM turma_aluno WHERE turma_id = ? AND aluno_id = ?',
      [turmaId, alunoId]
    );
  }
};
