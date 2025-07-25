To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

docker builder prune -f
docker compose down --volumes
docker compose build frontend --no-cache
docker compose build backend --no-cache
docker compose up -d

docker exec -it backend_challenge_comerc bunx drizzle-kit push
