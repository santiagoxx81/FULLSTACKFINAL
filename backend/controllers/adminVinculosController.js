const svc = require('../services/vinculosService');

exports.listarTurmas = async (_req, res) => {
  try {
    const turmas = await svc.listarTurmas();
    res.json(turmas);
  } catch (e) {
    res.status(500).json({ message: 'Erro ao listar turmas', detail: e.message });
  }
};

exports.listarAlunos = async (_req, res) => {
  try {
    const alunos = await svc.listarAlunos();
    res.json(alunos);
  } catch (e) {
    res.status(500).json({ message: 'Erro ao listar alunos', detail: e.message });
  }
};

exports.listarVinculos = async (req, res) => {
  try {
    const turmaId = Number(req.query.turmaId);
    if (!turmaId) return res.status(400).json({ message: 'turmaId é obrigatório' });
    const vinculos = await svc.listarVinculosPorTurma(turmaId);
    res.json(vinculos);
  } catch (e) {
    res.status(500).json({ message: 'Erro ao listar vínculos', detail: e.message });
  }
};

exports.vincular = async (req, res) => {
  try {
    const turmaId = Number(req.params.turmaId);
    const { alunoId, matricula } = req.body || {};
    if (!turmaId) return res.status(400).json({ message: 'turmaId inválido' });

    if (alunoId) {
      await svc.vincularPorAlunoId(turmaId, Number(alunoId));
      return res.json({ ok: true });
    }
    if (matricula) {
      await svc.vincularPorMatricula(turmaId, String(matricula));
      return res.json({ ok: true });
    }
    return res.status(400).json({ message: 'Informe alunoId ou matricula' });
  } catch (e) {
    res.status(500).json({ message: 'Erro ao vincular', detail: e.message });
  }
};

exports.remover = async (req, res) => {
  try {
    const turmaId = Number(req.params.turmaId);
    const alunoId = Number(req.params.alunoId);
    if (!turmaId || !alunoId) return res.status(400).json({ message: 'IDs inválidos' });
    await svc.removerVinculo(turmaId, alunoId);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: 'Erro ao remover vínculo', detail: e.message });
  }
};
