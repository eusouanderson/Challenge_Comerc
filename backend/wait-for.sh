#!/bin/sh

host="$1"
shift
cmd="$@"

until nc -z "$host" 5432; do
  echo "Waiting for Postgres at $host:5432..."
  sleep 1
done

echo "Postgres is up - executing command"
exec $cmd
