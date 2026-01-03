import { createClient } from 'redis';

declare global {
  var redisClient: ReturnType<typeof createClient> | undefined;
}

export const redisClient = global.redisClient ?? createClient({
  url: process.env.REDIS_URL,
});

if (process.env.NODE_ENV !== 'production') global.redisClient = redisClient;

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
      console.log('Redis connected');
    } catch (error) {
      console.error('Error connecting to Redis:', error);
    }
  }
};

export default redisClient;