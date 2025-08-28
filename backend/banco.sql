DROP DATABASE IF EXISTS sistema_alunos;
CREATE DATABASE sistema_alunos;
USE sistema_alunos;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil ENUM("ADM", "PROFESSOR", "ALUNO") NOT NULL,
    ativo BOOLEAN DEFAULT FALSE
);

CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    matricula VARCHAR(255) UNIQUE,
    email VARCHAR(255),
    telefone VARCHAR(20),
    usuario_id INT UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    telefone VARCHAR(20),
    usuario_id INT UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    periodo VARCHAR(50),
    professor_id INT,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL
);

CREATE TABLE disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    carga_horaria INT
);

CREATE TABLE turma_aluno (
    turma_id INT,
    aluno_id INT,
    PRIMARY KEY (turma_id, aluno_id),
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);

CREATE TABLE turma_disciplina (
    turma_id INT,
    disciplina_id INT,
    PRIMARY KEY (turma_id, disciplina_id),
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE
);

CREATE TABLE notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    turma_id INT NOT NULL,
    nota DECIMAL(4,2) NOT NULL,
    data_lancamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
);

CREATE TABLE frequencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    turma_id INT NOT NULL,
    data_aula DATE NOT NULL,
    presente BOOLEAN NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
);

-- Índices úteis para consultas de vínculo
CREATE INDEX idx_turma_aluno__aluno ON turma_aluno (aluno_id);
CREATE INDEX idx_turma_aluno__turma ON turma_aluno (turma_id);

-- Senha para todos os usuários: 123456 (hash bcrypt)
-- Hash fornecido:
SET @hashed_password = "$2b$12$5NA21FzvQEvDWSwa4U4fQ.7cuDrrQBly4UnbYqSn5.RIYlUZS.lye";

-- =========================
-- USUÁRIOS
-- =========================
INSERT INTO usuarios (usuario, senha, perfil, ativo) VALUES
("admin",       @hashed_password, "ADM",       TRUE),

("professor1",  @hashed_password, "PROFESSOR", TRUE),
("professor2",  @hashed_password, "PROFESSOR", TRUE),
("professor3",  @hashed_password, "PROFESSOR", TRUE),
("professor4",  @hashed_password, "PROFESSOR", TRUE),
("professor5",  @hashed_password, "PROFESSOR", TRUE),
("professor6",  @hashed_password, "PROFESSOR", TRUE),

("aluno1",      @hashed_password, "ALUNO",     TRUE),
("aluno2",      @hashed_password, "ALUNO",     TRUE),
("aluno3",      @hashed_password, "ALUNO",     TRUE),
("aluno4",      @hashed_password, "ALUNO",     TRUE),
("aluno5",      @hashed_password, "ALUNO",     TRUE),
("aluno6",      @hashed_password, "ALUNO",     TRUE),
("aluno7",      @hashed_password, "ALUNO",     TRUE),
("aluno8",      @hashed_password, "ALUNO",     TRUE),
("aluno9",      @hashed_password, "ALUNO",     TRUE),
("aluno10",     @hashed_password, "ALUNO",     TRUE),
("aluno11",     @hashed_password, "ALUNO",     TRUE),
("aluno12",     @hashed_password, "ALUNO",     TRUE),
("aluno13",     @hashed_password, "ALUNO",     TRUE),
("aluno14",     @hashed_password, "ALUNO",     TRUE),
("aluno15",     @hashed_password, "ALUNO",     TRUE),
("aluno16",     @hashed_password, "ALUNO",     TRUE),
("aluno17",     @hashed_password, "ALUNO",     TRUE),
("aluno18",     @hashed_password, "ALUNO",     TRUE),
("aluno19",     @hashed_password, "ALUNO",     TRUE),
("aluno20",     @hashed_password, "ALUNO",     TRUE);

-- =========================
-- PROFESSORES
-- =========================
INSERT INTO professores (nome, email, telefone, usuario_id) VALUES
("Prof. Carlos Silva",     "carlos.silva@escola.com",      "(11) 98765-4321", (SELECT id FROM usuarios WHERE usuario = "professor1")),
("Prof. Marina Souza",     "marina.souza@escola.com",      "(11) 90000-0002", (SELECT id FROM usuarios WHERE usuario = "professor2")),
("Prof. João Pereira",     "joao.pereira@escola.com",      "(11) 90000-0003", (SELECT id FROM usuarios WHERE usuario = "professor3")),
("Prof. Beatriz Lima",     "beatriz.lima@escola.com",      "(11) 90000-0004", (SELECT id FROM usuarios WHERE usuario = "professor4")),
("Prof. Ricardo Andrade",  "ricardo.andrade@escola.com",   "(11) 90000-0005", (SELECT id FROM usuarios WHERE usuario = "professor5")),
("Prof. Camila Ribeiro",   "camila.ribeiro@escola.com",    "(11) 90000-0006", (SELECT id FROM usuarios WHERE usuario = "professor6"));

-- =========================
-- ALUNOS (20 no total)
-- =========================
INSERT INTO alunos (nome, matricula, email, telefone, usuario_id) VALUES
("Ana Paula Souza",        "2023001", "ana.souza@email.com",       "(21) 99887-6655", (SELECT id FROM usuarios WHERE usuario = "aluno1")),
("Bruno Ferreira",         "2023002", "bruno.ferreira@email.com",  "(21) 90000-0002", (SELECT id FROM usuarios WHERE usuario = "aluno2")),
("Carla Mendes",           "2023003", "carla.mendes@email.com",    "(21) 90000-0003", (SELECT id FROM usuarios WHERE usuario = "aluno3")),
("Diego Santos",           "2023004", "diego.santos@email.com",    "(21) 90000-0004", (SELECT id FROM usuarios WHERE usuario = "aluno4")),
("Eduarda Pires",          "2023005", "eduarda.pires@email.com",   "(21) 90000-0005", (SELECT id FROM usuarios WHERE usuario = "aluno5")),
("Felipe Almeida",         "2023006", "felipe.almeida@email.com",  "(21) 90000-0006", (SELECT id FROM usuarios WHERE usuario = "aluno6")),
("Gabriela Rocha",         "2023007", "gabriela.rocha@email.com",  "(21) 90000-0007", (SELECT id FROM usuarios WHERE usuario = "aluno7")),
("Hugo Carvalho",          "2023008", "hugo.carvalho@email.com",   "(21) 90000-0008", (SELECT id FROM usuarios WHERE usuario = "aluno8")),
("Isabela Martins",        "2023009", "isabela.martins@email.com", "(21) 90000-0009", (SELECT id FROM usuarios WHERE usuario = "aluno9")),
("José Augusto",           "2023010", "jose.augusto@email.com",    "(21) 90000-0010", (SELECT id FROM usuarios WHERE usuario = "aluno10")),
("Karina Lopes",           "2023011", "karina.lopes@email.com",    "(21) 90000-0011", (SELECT id FROM usuarios WHERE usuario = "aluno11")),
("Lucas Barbosa",          "2023012", "lucas.barbosa@email.com",   "(21) 90000-0012", (SELECT id FROM usuarios WHERE usuario = "aluno12")),
("Mariana Costa",          "2023013", "mariana.costa@email.com",   "(21) 90000-0013", (SELECT id FROM usuarios WHERE usuario = "aluno13")),
("Nicolas Faria",          "2023014", "nicolas.faria@email.com",   "(21) 90000-0014", (SELECT id FROM usuarios WHERE usuario = "aluno14")),
("Olivia Nunes",           "2023015", "olivia.nunes@email.com",    "(21) 90000-0015", (SELECT id FROM usuarios WHERE usuario = "aluno15")),
("Paulo Henrique",         "2023016", "paulo.henrique@email.com",  "(21) 90000-0016", (SELECT id FROM usuarios WHERE usuario = "aluno16")),
("Queila Azevedo",         "2023017", "queila.azevedo@email.com",  "(21) 90000-0017", (SELECT id FROM usuarios WHERE usuario = "aluno17")),
("Rafael Teixeira",        "2023018", "rafael.teixeira@email.com", "(21) 90000-0018", (SELECT id FROM usuarios WHERE usuario = "aluno18")),
("Sabrina Moura",          "2023019", "sabrina.moura@email.com",   "(21) 90000-0019", (SELECT id FROM usuarios WHERE usuario = "aluno19")),
("Tiago Moreira",          "2023020", "tiago.moreira@email.com",   "(21) 90000-0020", (SELECT id FROM usuarios WHERE usuario = "aluno20"));

-- =========================
-- TURMAS
-- =========================
INSERT INTO turmas (nome, periodo, professor_id) VALUES
("Turma A - Manhã", "Manhã", (SELECT id FROM professores WHERE nome = "Prof. Carlos Silva")),
("Turma B - Tarde", "Tarde", (SELECT id FROM professores WHERE nome = "Prof. Marina Souza")),
("Turma C - Noite", "Noite", (SELECT id FROM professores WHERE nome = "Prof. João Pereira"));

-- =========================
-- DISCIPLINAS
-- =========================
INSERT INTO disciplinas (nome, carga_horaria) VALUES
("Matemática", 80),
("Português", 60),
("Física", 60),
("História", 60);

-- Associação Turma-Disciplina
INSERT INTO turma_disciplina (turma_id, disciplina_id) VALUES
((SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), (SELECT id FROM disciplinas WHERE nome = "Matemática")),
((SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), (SELECT id FROM disciplinas WHERE nome = "Português")),
((SELECT id FROM turmas WHERE nome = "Turma B - Tarde"), (SELECT id FROM disciplinas WHERE nome = "Matemática")),
((SELECT id FROM turmas WHERE nome = "Turma B - Tarde"), (SELECT id FROM disciplinas WHERE nome = "História")),
((SELECT id FROM turmas WHERE nome = "Turma C - Noite"), (SELECT id FROM disciplinas WHERE nome = "Física")),
((SELECT id FROM turmas WHERE nome = "Turma C - Noite"), (SELECT id FROM disciplinas WHERE nome = "Português"));

-- =========================
-- VÍNCULOS INICIAIS ALUNO ⇄ TURMA (exemplos)
-- =========================
-- A: alunos 1–7 | B: 8–14 | C: 15–20
INSERT INTO turma_aluno (turma_id, aluno_id)
SELECT (SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), a.id FROM alunos a WHERE a.matricula BETWEEN "2023001" AND "2023007";
INSERT INTO turma_aluno (turma_id, aluno_id)
SELECT (SELECT id FROM turmas WHERE nome = "Turma B - Tarde"), a.id FROM alunos a WHERE a.matricula BETWEEN "2023008" AND "2023014";
INSERT INTO turma_aluno (turma_id, aluno_id)
SELECT (SELECT id FROM turmas WHERE nome = "Turma C - Noite"), a.id FROM alunos a WHERE a.matricula BETWEEN "2023015" AND "2023020";

-- =========================
-- NOTAS (exemplos só para Ana Paula)
-- =========================
INSERT INTO notas (aluno_id, disciplina_id, turma_id, nota) VALUES
((SELECT id FROM alunos WHERE nome = "Ana Paula Souza"), (SELECT id FROM disciplinas WHERE nome = "Matemática"), (SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), 8.5),
((SELECT id FROM alunos WHERE nome = "Ana Paula Souza"), (SELECT id FROM disciplinas WHERE nome = "Português"),  (SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), 9.0);

-- =========================
-- FREQUÊNCIA (exemplos só para Ana Paula)
-- =========================
INSERT INTO frequencia (aluno_id, disciplina_id, turma_id, data_aula, presente) VALUES
((SELECT id FROM alunos WHERE nome = "Ana Paula Souza"), (SELECT id FROM disciplinas WHERE nome = "Matemática"), (SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), "2023-08-20", TRUE),
((SELECT id FROM alunos WHERE nome = "Ana Paula Souza"), (SELECT id FROM disciplinas WHERE nome = "Matemática"), (SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), "2023-08-22", FALSE);

-- =========================
-- VIEW para facilitar a gestão (lista vínculos)
-- =========================
CREATE OR REPLACE VIEW vw_turma_alunos AS
SELECT
  t.id           AS turma_id,
  t.nome         AS turma_nome,
  t.periodo      AS turma_periodo,
  a.id           AS aluno_id,
  a.nome         AS aluno_nome,
  a.matricula    AS aluno_matricula
FROM turma_aluno ta
JOIN turmas t   ON t.id = ta.turma_id
JOIN alunos a   ON a.id = ta.aluno_id
ORDER BY t.nome, a.nome;

-- =========================
-- PROCEDURES para vincular aluno à turma
-- =========================
DELIMITER $$

CREATE OR REPLACE PROCEDURE sp_vincular_aluno_turma(IN p_turma_id INT, IN p_aluno_id INT)
BEGIN
  -- evita duplicidade
  IF NOT EXISTS (SELECT 1 FROM turma_aluno WHERE turma_id = p_turma_id AND aluno_id = p_aluno_id) THEN
    INSERT INTO turma_aluno (turma_id, aluno_id) VALUES (p_turma_id, p_aluno_id);
  END IF;
END$$

CREATE OR REPLACE PROCEDURE sp_vincular_aluno_turma_por_matricula(IN p_turma_id INT, IN p_matricula VARCHAR(255))
BEGIN
  DECLARE v_aluno_id INT;
  SELECT id INTO v_aluno_id FROM alunos WHERE matricula = p_matricula LIMIT 1;
  IF v_aluno_id IS NOT NULL THEN
    IF NOT EXISTS (SELECT 1 FROM turma_aluno WHERE turma_id = p_turma_id AND aluno_id = v_aluno_id) THEN
      INSERT INTO turma_aluno (turma_id, aluno_id) VALUES (p_turma_id, v_aluno_id);
    END IF;
  END IF;
END$$

DELIMITER ;

-- Exemplos de uso:
-- CALL sp_vincular_aluno_turma( (SELECT id FROM turmas WHERE nome="Turma A - Manhã"), (SELECT id FROM alunos WHERE matricula="2023012") );
-- CALL sp_vincular_aluno_turma_por_matricula( (SELECT id FROM turmas WHERE nome="Turma B - Tarde"), "2023018" );
