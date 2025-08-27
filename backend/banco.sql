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

-- Inserção de dados iniciais

-- Senha para todos os usuários: 123456 (hash bcrypt)
-- Hash gerado: $2b$12$5NA21FzvQEvDWSwa4U4fQ.7cuDrrQBly4UnbYqSn5.RIYlUZS.lye
SET @hashed_password = 
'$2b$12$5NA21FzvQEvDWSwa4U4fQ.7cuDrrQBly4UnbYqSn5.RIYlUZS.lye';

-- Usuários
INSERT INTO usuarios (usuario, senha, perfil, ativo) VALUES
("admin", @hashed_password, "ADM", TRUE),
("professor1", @hashed_password, "PROFESSOR", TRUE),
("aluno1", @hashed_password, "ALUNO", TRUE);

-- Professores
INSERT INTO professores (nome, email, telefone, usuario_id) VALUES
("Prof. Carlos Silva", "carlos.silva@escola.com", "(11) 98765-4321", (SELECT id FROM usuarios WHERE usuario = "professor1"));

-- Alunos
INSERT INTO alunos (nome, matricula, email, telefone, usuario_id) VALUES
("Ana Paula Souza", "2023001", "ana.souza@email.com", "(21) 99887-6655", (SELECT id FROM usuarios WHERE usuario = "aluno1"));

-- Turmas
INSERT INTO turmas (nome, periodo, professor_id) VALUES
("Turma A - Manhã", "Manhã", (SELECT id FROM professores WHERE nome = "Prof. Carlos Silva"));

-- Disciplinas
INSERT INTO disciplinas (nome, carga_horaria) VALUES
("Matemática", 80),
("Português", 60);

-- Associação Aluno-Turma
INSERT INTO turma_aluno (turma_id, aluno_id) VALUES
((SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), (SELECT id FROM alunos WHERE nome = "Ana Paula Souza"));

-- Associação Turma-Disciplina
INSERT INTO turma_disciplina (turma_id, disciplina_id) VALUES
((SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), (SELECT id FROM disciplinas WHERE nome = "Matemática")),
((SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), (SELECT id FROM disciplinas WHERE nome = "Português"));

-- Notas
INSERT INTO notas (aluno_id, disciplina_id, turma_id, nota) VALUES
((SELECT id FROM alunos WHERE nome = "Ana Paula Souza"), (SELECT id FROM disciplinas WHERE nome = "Matemática"), (SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), 8.5),
((SELECT id FROM alunos WHERE nome = "Ana Paula Souza"), (SELECT id FROM disciplinas WHERE nome = "Português"), (SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), 9.0);

-- Frequência
INSERT INTO frequencia (aluno_id, disciplina_id, turma_id, data_aula, presente) VALUES
((SELECT id FROM alunos WHERE nome = "Ana Paula Souza"), (SELECT id FROM disciplinas WHERE nome = "Matemática"), (SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), "2023-08-20", TRUE),
((SELECT id FROM alunos WHERE nome = "Ana Paula Souza"), (SELECT id FROM disciplinas WHERE nome = "Matemática"), (SELECT id FROM turmas WHERE nome = "Turma A - Manhã"), "2023-08-22", FALSE);

