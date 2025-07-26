#!/bin/sh

host="$1"
shift
cmd="$@"

echo "Waiting for Postgres at $host:5432..."

until nc -z "$host" 5432; do
  sleep 1
done

echo "Postgres is up - running migrations..."
bun run migrate:dev

echo "Running seed script..."
bun run seed

echo "Starting app with: $cmd"
exec $cmd
