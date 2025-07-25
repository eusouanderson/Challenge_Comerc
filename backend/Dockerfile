FROM oven/bun:1.1.13-alpine

WORKDIR /app

COPY backend/package.json backend/bun.lockb* ./
RUN bun install --frozen-lockfile

COPY backend ./

COPY backend/wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

EXPOSE 3000

CMD ["/wait-for.sh", "postgres", "bun", "run", "dev"]
