# Rodando scripts Drizzle e seed via Docker

Seu backend roda no container chamado `backend_challenge_comerc`.

## Scripts disponíveis no `package.json`

| Script         | Descrição                                    |
| -------------- | -------------------------------------------- |
| `dev`          | Inicia o backend em modo hot reload          |
| `studio:dev`   | Abre o Drizzle Studio (interface visual)     |
| `migrate:dev`  | Aplica as migrations pendentes no banco      |
| `generate:dev` | Gera uma nova migration baseada no schema    |
| `push`         | Aplica mudanças no banco direto (cuidado!)   |
| `start`        | Inicia o backend normalmente                 |
| `seed`         | Roda o script para popular o banco com dados |

---

## Como rodar os scripts via Docker

Execute qualquer script dentro do container backend com:

```bash
docker exec -it backend_challenge_comerc bun run <script_path>
```

Ou use o pnpm para comandos Drizzle Kit:

```bash

docker exec -it backend_challenge_comerc pnpm drizzle-kit <comando>
Exemplos práticos
Rodar migrations:
```

```bash
docker exec -it backend_challenge_comerc pnpm drizzle-kit migrate
Gerar uma nova migration (após alterar schema):
```

```bash
docker exec -it backend_challenge_comerc pnpm drizzle-kit generate
Popular banco com seed:
```

```bash
docker exec -it backend_challenge_comerc bun run src/scripts/seed.ts
Rodar backend em modo desenvolvimento (hot reload):
```

```bash
docker exec -it backend_challenge_comerc bun run --hot src/index.ts
```

```bash
await db.insert(users).values({
id: generateId(), // Gera um UUID único para o usuário
name: 'Admin', // Nome do usuário admin
document: generateCPF(), // Gera um CPF válido (fake) para o admin
email: 'admin@admin.com', // Email padrão do admin para login
password: 'admin', // Senha padrão (deve ser alterada depois)
status: 'active', // Status ativo para poder usar o sistema
});

```
