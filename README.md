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

### Mas é claro que já deixei tudo automatico!

| Ao rodar:

```bash
docker compose up
```

Todas as etapas de build do projeto entraram em execução.

# App is running

### Acesse o app em:

```bash
  http://localhost:5173/
```

## 👤 Login de Usuário

**Email:** user@admin.com

**Senha:** admin123

### 👥 Login de Cliente

**Email:** client@admin.com

**Senha:** admin123

⚠️ Atenção
Caso você mesmo desative o seu cadastro, ainda será possível acessar diretamente a rota:

http://localhost:5173/management

**Name** Client

### ⚠️ **Atenção**

> ⚠ **Atenção:** Atualmente esta rota **não possui proteção de segurança**  
> _(sem auth guard, verificação de token ou checagem de status ativo)_.
>
> 🛠️ Portanto, é possível **reativar seu cadastro manualmente** acessando:
> 👉 [`http://localhost:5173/management`](http://localhost:5173/management)
