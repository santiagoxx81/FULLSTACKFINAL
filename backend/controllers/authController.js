const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

exports.register = async (req, res) => {
  const { usuario, senha, perfil } = req.body;
  try {
    const [rows] = await pool.execute('SELECT 1 FROM usuarios WHERE usuario = ?', [usuario]);
    if (rows.length > 0) return res.status(400).json({ message: 'Usuário já existe' });

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    await pool.execute(
      'INSERT INTO usuarios (usuario, senha, perfil, ativo) VALUES (?, ?, ?, ?)',
      [usuario, senhaHash, perfil, true]
    );

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor!' });
  }
};

exports.login = async (req, res) => {
  const { usuario, senha } = req.body;
  try {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    if (rows.length === 0) return res.status(400).json({ message: 'Credenciais inválidas!' });

    const user = rows[0];
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas!' });

    const token = jwt.sign(
      { id: user.id, perfil: user.perfil },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, perfil: user.perfil });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor!' });
  }
};
