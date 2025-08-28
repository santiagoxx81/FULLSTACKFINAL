const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const turmaRoutes = require('./routes/turmaRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const notaRoutes = require('./routes/notaRoutes');
const frequenciaRoutes = require('./routes/frequenciaRoutes');

dotenv.config();

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

const app = express();
const PORT = process.env.PORT || 3000;
const adminVinculosRoutes = require('./routes/adminVinculosRoutes');
app.use('/admin', adminVinculosRoutes);
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/turmas', turmaRoutes);
app.use('/api/disciplinas', disciplinaRoutes);
app.use('/api/notas', notaRoutes);
app.use('/api/frequencia', frequenciaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


