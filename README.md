# Versões

## Frontend
- Angular CLI: 16.2.16
- Node: 18.20.6
- Package Manager: npm 10.8.2

## Backend
- Java: 17

# Como rodar o projeto
## Pré-requisitos
- Para executar o projeto localmente, é necessário ter instalado:

- Java 17
- Node.js (versão 18.20.6)
- MySQL
- Angular CLI (versão 16.2.16)
- Maven

## Configuração do Banco de Dados
- Abra o MySQL Workbench ou terminal MySQL
- Execute os seguintes comandos SQL:


```sql
CREATE DATABASE mywallet;
USE mywallet;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_login DATETIME,
	perfil ENUM('ADMIN', 'USUARIO') NOT NULL,
    ativo ENUM('ATIVO', 'INATIVO') DEFAULT 'ATIVO',
    deleted_at DATETIME NULL
);

CREATE TABLE carteiras (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    saldo_total DECIMAL(18,2) DEFAULT 0,
    percentual_ganho DECIMAL(5,2) DEFAULT 0,
    percentual_perda DECIMAL(5,2) DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE ativos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    categoria ENUM('AÇÃO', 'CRYPTO', 'FII', 'ETF', 'RENDA_FIXA') NOT NULL,
    descricao TEXT
);

CREATE TABLE investimentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_carteira INT NOT NULL,
    id_ativo INT NOT NULL,
    quantidade DECIMAL(18,8) NOT NULL,
    preco_medio DECIMAL(18,2) NOT NULL,
    data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_carteira) REFERENCES carteiras(id) ON DELETE CASCADE,
    FOREIGN KEY (id_ativo) REFERENCES ativos(id) ON DELETE CASCADE
);

CREATE TABLE historico_precos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_ativo INT NOT NULL,
    preco DECIMAL(18,2) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_ativo) REFERENCES ativos(id) ON DELETE CASCADE
);

CREATE TABLE relatorios_financeiros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_carteira INT NOT NULL,
    descricao TEXT NOT NULL,
    data_geracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_carteira) REFERENCES carteiras(id) ON DELETE CASCADE
);

CREATE TABLE analise_risco (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_carteira INT NOT NULL,
    risco ENUM('BAIXO', 'MÉDIO', 'ALTO') NOT NULL,
    volatilidade DECIMAL(5,2) NOT NULL,
    perda_maxima DECIMAL(18,2) NOT NULL,
    recomendacao TEXT,
    data_analise TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_carteira) REFERENCES carteiras(id) ON DELETE CASCADE
);

CREATE TABLE metas_financeiras (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_carteira INT NOT NULL,
    objetivo VARCHAR(100) NOT NULL,
    valor_meta DECIMAL(18,2) NOT NULL,
    prazo DATE NOT NULL,
    status ENUM('EM PROGRESSO', 'ATINGIDA', 'NÃO ATINGIDA') DEFAULT 'EM PROGRESSO',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_carteira) REFERENCES carteiras(id) ON DELETE CASCADE
);
```

## Instalação e execução
### Frontend
```bash
# Clone o repositório:
git clone https://github.com/tiagogorridev/my-wallet-front.git
cd my-wallet-front

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
ng s -o
```

### Backend
```bash
# Clone o repositório do backend:
git clone https://github.com/tiagogorridev/my-wallet-back.git
cd my-wallet-back
```

### Configure as variáveis de ambiente
```bash
export DB_URL=jdbc:mysql://localhost:3306/sistema_gerenciamento_bd
export DB_USERNAME=seu_usuario
export DB_PASSWORD=sua_senha
```

Alternativa: Crie um arquivo application.properties na pasta src/main/resources com o conteúdo:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/sistema_gerenciamento_bd
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Compile e execute o backend
```bash
mvn clean install
mvn spring-boot:run
```

## Acesse a aplicação em seu navegador:
Frontend: http://localhost:4200

## Contato
Para mais informações, entre em contato:

Email: tiagogorri@gmail.com  
GitHub: tiagogorridev
