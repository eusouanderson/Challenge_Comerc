import Redis from 'ioredis';

export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
});

redis.on('connect', () => console.log('Redis connected!'));
redis.on('error', (err) => console.error('Redis Client Error', err));
