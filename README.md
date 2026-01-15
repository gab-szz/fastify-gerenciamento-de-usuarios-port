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
