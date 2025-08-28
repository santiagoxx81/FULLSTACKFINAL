const pool = require('../db');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (_req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, usuario, perfil, ativo FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT id, usuario, perfil, ativo FROM usuarios WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { usuario, perfil, ativo, senha } = req.body;
  try {
    // Atualiza sem senha
    await pool.execute(
      'UPDATE usuarios SET usuario = ?, perfil = ?, ativo = ? WHERE id = ?',
      [usuario, perfil, ativo, id]
    );

    // Se veio senha nova, atualiza hash
    if (senha && String(senha).trim()) {
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);
      await pool.execute('UPDATE usuarios SET senha = ? WHERE id = ?', [senhaHash, id]);
    }

    res.json({ message: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
};

exports.toggleUserStatus = async (req, res) => {
  const { id } = req.params;
  const { ativo } = req.body;
  try {
    const [result] = await pool.execute('UPDATE usuarios SET ativo = ? WHERE id = ?', [ativo, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json({ message: `Usuário ${ativo ? 'ativado' : 'desativado'} com sucesso!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao alterar status do usuário.' });
  }
};
