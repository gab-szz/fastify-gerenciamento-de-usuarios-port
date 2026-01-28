# Fastify-Gerenciamento de Usuarios

## Introdução e Objetivo

Este presente projeto tem como objetivo aplicar os conceitos aprendidos em livros e vídeo-aulas em relação à _Arquitetura Hexagonal_ e _Arquitetura Limpa_. Com a regra clara de não utilizar IA para escrever este projeto, mas apenas documentações externas, livros e muita lógica, tenho certeza de que irei aprender muito e solidificar meus conhecimentos mais abstratos.

## Diagrama Entidade Relacionamento

```mermaid
erDiagram
    direction TB

    perfil {
        int id PK
        string nome
        datetime criado_em
        datetime alterado_em
        datetime excluido_em
    }

    setor {
        int id PK
        string nome
        datetime criado_em
        datetime alterado_em
        datetime excluido_em
    }

    endereco {
        int id PK
        string rua
        string cidade
        string estado
        string cep
        datetime criado_em
        datetime alterado_em
        datetime excluido_em
    }

    usuario {
        int id PK
        string cpf UK
        string nome
        string email UK
        string senha_hash
        boolean ativo
        int setor_id FK
        int perfil_id FK
        int superior_id FK
        datetime criado_em
        datetime alterado_em
        datetime excluido_em
    }

    usuario_endereco {
        int usuario_id PK,FK
        int endereco_id PK,FK
    }

    perfil ||--o{ usuario : "atribuido a"
    setor ||--o{ usuario : "contem"
    usuario ||--o{ usuario_endereco : "possui"
    endereco ||--o{ usuario_endereco : "vinculado a"
    usuario |o--o| usuario : "reporta a (superior)"
```

## Diagrama de Classes

```mermaid
classDiagram
direction TB
    class Setor {
	    +int id
	    +String nome
      +int criado_em
	    +String alterado_em
      +int excluido_em
	    +criar()
      +hidratar()
	    +atualizar()
      +excluir()
      +reativar()
    }

```

# Diagramas de Casos de Uso

## Setor

Iniciando pela entidade de Setor, que é uma entidade básica do sistema e necessária para a criação do usuário, começaremos mapeando seus casos de uso:

```mermaid
flowchart LR
 subgraph subGraph0["Módulo Setor"]
        UC1["UC01 - Criar Setor"]
        UC2["UC02 - Consultar Setores"]
        UC3["UC03 - Atualizar Dados do Setor"]
        UC4["UC04 - Desativar Setor"]
        UC5["UC05 - Listar Usuários por Setor"]
  end
    User(("Cliente")) --> UC2
    Admin(("Administrador")) --> UC1 & UC2 & UC3 & UC4
    UC2 -. extend .-> UC5
```
