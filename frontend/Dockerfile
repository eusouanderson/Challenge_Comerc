FROM node:22-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY frontend/package.json frontend/pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY frontend .
EXPOSE 5173

CMD ["pnpm", "run", "dev"]
