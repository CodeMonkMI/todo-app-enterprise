import { createClient, RedisClientType } from "redis";

export class RedisService {
  private static instance: RedisService;
  private client: RedisClientType;

  private constructor() {
    this.client = createClient({
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });

    this.client.on("error", (err) => {
      console.error("❌ Redis Client Error:", err);
    });
  }

  public static async getInstance(): Promise<RedisService> {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
      await RedisService.instance.connect();
    }
    return RedisService.instance;
  }

  private async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
      console.log("✅ Redis connected");
    }
  }

  // Set with optional expiration (in seconds)
  public async set(key: string, value: any, ttl?: number): Promise<void> {
    const strValue = JSON.stringify(value);
    if (ttl) {
      await this.client.setEx(key, ttl, strValue);
    } else {
      await this.client.set(key, strValue);
    }
  }

  // Get and parse JSON
  public async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  // Delete a key
  public async del(key: string): Promise<void> {
    try {
      if (key.includes("*")) {
        const keys = (await this.client.keys(key)) || [];
        if (keys.length > 0) {
          // Type assertion for TS to avoid TS255
          for (const k of keys) {
            await this.client.del(k);
          }
          console.log(`Deleted ${keys.length} keys with pattern: ${key}`);
        } else {
          console.log("No keys matched");
        }
        return;
      }
      const result = await this.client.del(key);
      console.log(result);
    } catch (error) {
      console.log("error deleting cache", error);
    }
  }

  // Check if key exists
  public async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  // Close connection
  public async disconnect(): Promise<void> {
    await this.client.quit();
    console.log("🔌 Redis disconnected");
  }
}
