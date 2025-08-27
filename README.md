# Sistema de Gerenciamento de Alunos

Este projeto é um sistema de gerenciamento de alunos full-stack, desenvolvido com Node.js (Express) para o backend e Angular para o frontend. Ele inclui funcionalidades de autenticação, autorização baseada em perfis (ADM, PROFESSOR, ALUNO) e gerenciamento de alunos, turmas, disciplinas, notas e frequência.

## Estrutura do Projeto

```
projeto_alunos/
├── backend/                  # Backend Node.js (Express)
│   ├── controllers/          # Lógica de negócio para cada entidade
│   ├── middleware/           # Middlewares de autenticação e autorização
│   ├── routes/               # Definição das rotas da API
│   ├── .env                  # Variáveis de ambiente (configuração do banco de dados, JWT_SECRET)
│   ├── db.js                 # Configuração da conexão com o banco de dados
│   ├── package.json          # Dependências do backend
│   └── server.js             # Ponto de entrada do servidor
├── frontend/                 # Frontend Angular
│   ├── src/                  # Código fonte do Angular
│   │   ├── app/              # Módulos, componentes, serviços, rotas
│   │   ├── environments/     # Configurações de ambiente (URL da API)
│   │   └── ...               # Outros arquivos do Angular
│   ├── angular.json          # Configuração do projeto Angular
│   ├── package.json          # Dependências do frontend
│   └── ...                   # Outros arquivos de configuração do Angular
└── banco.sql                 # Script SQL para criação do banco de dados e tabelas
```

## Configuração e Execução

Siga os passos abaixo para configurar e executar o projeto em sua máquina.

### 1. Configuração do Banco de Dados (MySQL)

Certifique-se de ter o MySQL instalado e em execução.

1.  **Crie o banco de dados:**
    Abra seu cliente MySQL (ex: MySQL Workbench, DBeaver, ou terminal) e execute o script `banco.sql` para criar o banco de dados `sistema_alunos` e todas as tabelas necessárias.

    ```sql
    SOURCE /caminho/para/o/seu/projeto_alunos/banco.sql;
    ```
    (Substitua `/caminho/para/o/seu/projeto_alunos/` pelo caminho real onde você salvou o arquivo `banco.sql`)

2.  **Verifique as credenciais:**
    O arquivo `backend/.env` contém as credenciais de conexão com o banco de dados. Verifique se `DB_USER` e `DB_PASSWORD` correspondem às suas configurações do MySQL. A senha padrão que você forneceu (`Yasmin*82`) já está configurada.

    ```dotenv
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=Yasmin*82
    DB_NAME=sistema_alunos
    JWT_SECRET=supersecretjwt_sua_chave_secreta_aqui_
    ```

### 2. Execução do Backend

1.  **Navegue até o diretório do backend:**
    ```bash
    cd projeto_alunos/backend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor:**
    ```bash
    node server.js
    # ou
    npm start
    ```
    O servidor estará rodando em `http://localhost:3000` (ou na porta definida em `PORT` no `.env`).

### 3. Execução do Frontend

1.  **Navegue até o diretório do frontend:**
    ```bash
    cd projeto_alunos/frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o aplicativo Angular:**
    ```bash
    ng serve
    ```
    O aplicativo Angular estará disponível em `http://localhost:4200`.

### 4. Criando um Usuário Administrador Inicial

Para começar a usar o sistema, você precisará de um usuário administrador para validar outros cadastros e gerenciar as entidades.

1.  **Registre um usuário via frontend:**
    Acesse `http://localhost:4200/register` no seu navegador.
    Crie um novo usuário com `perfil` como `ADM` (Administrador).
    *Atenção: Este usuário estará inativo por padrão após o registro.* 

2.  **Ative o usuário administrador diretamente no banco de dados:**
    Como o primeiro ADM precisa ativar a si mesmo (ou ser ativado por outro ADM, o que não existe inicialmente), você precisará ativar este primeiro usuário diretamente no banco de dados.

    Abra seu cliente MySQL e execute o seguinte comando:

    ```sql
    UPDATE usuarios SET ativo = TRUE WHERE usuario = 'seu_usuario_admin_aqui';
    ```
    (Substitua `'seu_usuario_admin_aqui'` pelo nome de usuário que você registrou para o ADM).

Agora você pode fazer login como administrador em `http://localhost:4200/login` e começar a gerenciar o sistema.

## Funcionalidades Implementadas

### Backend (Node.js/Express)

*   **Autenticação e Autorização:** Registro, Login, JWT, Middlewares de verificação de token e perfil.
*   **Gerenciamento de Usuários:** CRUD completo para usuários (apenas ADM).
*   **Gerenciamento de Alunos:** CRUD completo para alunos (ADM, visualização para PROFESSOR).
*   **Gerenciamento de Professores:** CRUD completo para professores (ADM, visualização para PROFESSOR).
*   **Gerenciamento de Turmas:** CRUD completo para turmas, adição/remoção de alunos em turmas (ADM, visualização para PROFESSOR).
*   **Gerenciamento de Disciplinas:** CRUD completo para disciplinas, associação/desassociação com turmas (ADM, visualização para PROFESSOR).
*   **Gerenciamento de Notas:** Lançamento, visualização, atualização e exclusão de notas (PROFESSOR e ADM, visualização para ALUNO).
*   **Gerenciamento de Frequência:** Registro, visualização, atualização e exclusão de frequência (PROFESSOR e ADM, visualização para ALUNO).

### Frontend (Angular)

*   **Páginas de Autenticação:** Login e Registro.
*   **Dashboards por Perfil:** ADM, Professor e Aluno.
*   **Gerenciamento de Entidades:** Interfaces para listar, criar, editar e excluir usuários, alunos, turmas e disciplinas.
*   **Funcionalidades de Professor:** Visualização de turmas, lançamento de notas e registro de frequência.
*   **Funcionalidades de Aluno:** Visualização de notas e frequência.
*   **Navegação:** Componentes de cabeçalho e rodapé.

## Acessibilidade (Implementação Inicial)

As seguintes funcionalidades de acessibilidade foram consideradas na estrutura inicial do frontend:

*   **Semântica HTML:** Uso de tags HTML semânticas para melhor interpretação por leitores de tela.
*   **Navegação por Teclado:** Elementos interativos são acessíveis via `Tab` e `Enter`.
*   **Feedback Visual:** Mensagens de erro e sucesso com classes CSS distintas para fácil identificação.

Para uma implementação completa de acessibilidade (alto contraste, controle por voz, etc.), seria necessário um trabalho mais aprofundado em CSS e JavaScript, além da integração com APIs de navegador ou bibliotecas específicas.

## Próximos Passos para o Desenvolvimento

*   **Estilização (CSS):** O projeto possui estilos básicos. Você pode personalizá-los em `src/styles.css` e nos arquivos `.css` de cada componente.
*   **Validação de Formulários:** Implementar validações mais robustas no frontend.
*   **Tratamento de Erros:** Melhorar a exibição de mensagens de erro para o usuário.
*   **UX/UI:** Aprimorar a experiência do usuário e a interface visual.
*   **Acessibilidade Avançada:** Explorar bibliotecas ou técnicas para alto contraste, controle por voz e outras funcionalidades de acessibilidade.
*   **Funcionalidades Adicionais:** Implementar funcionalidades como recuperação de senha, upload de arquivos (ex: foto do aluno), relatórios, etc.

Espero que este projeto seja um excelente ponto de partida para o seu aprendizado e desenvolvimento!

