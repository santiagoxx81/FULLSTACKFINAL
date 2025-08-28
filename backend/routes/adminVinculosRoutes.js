const express = require('express');
const router = express.Router();
const { verifyToken, verifyPerfil } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/adminVinculosController');

// Todas as rotas exigem token + perfil ADM
router.use(verifyToken, verifyPerfil(['ADM']));

router.get('/turmas', ctrl.listarTurmas);
router.get('/alunos', ctrl.listarAlunos);
router.get('/vinculos', ctrl.listarVinculos); // ?turmaId=ID
router.post('/turmas/:turmaId/alunos', ctrl.vincular);
router.delete('/turmas/:turmaId/alunos/:alunoId', ctrl.remover);

module.exports = router;
