import redisClient from 'redis';
import { promisify } from 'util';
export class Redis {
    constructor() {
        this.instance = null;
        this.client = redisClient.createClient({
            host: '',
            port: 6379,
            retry_strategy: ($option) => {
                if ($options.error && $options.error.code === 'ECONNREFUSED') {
                    // End reconnecting on a specific error and flush all commands with
                    // a individual error
                    return new Error('The server refused the connection');
                }
                if ($options.total_retry_time > 1000 * 60 * 60) {
                    // End reconnecting after a specific timeout and flush all commands
                    // with a individual error
                    return new Error('Retry time exhausted');
                }
                if ($options.attempt > 3) {
                    // End reconnecting with built in error
                    return undefined;
                }
                // reconnect after
                return Math.min($options.attempt * 100, 3000);
            }
        });
        this.client.on("error", function($err) {
            console.log("Error" + $err);
        })
        this.client.on('connect', () => {
            console.log('redis connection');
        })
        this.client.on('end', () => {
            console.log('an established Redis server connection has closed');
        })
        this.client.on('reconnecting', ($err) => {
            console.log(`redis 正在重新连接......${$err.attempt}`);
        })
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.set).bind(this.client);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Redis();
        }
        return this.instance;
    }
    async set($key, $val, $expire = 60 * 5) {
        try {
            const res = await this.setAsync($key, $val, 'EX', $expire);
            return res;
        } catch ($err) {
            console.log($err);
            return null;
        }
    }
    async get($key) {
        try {
            const res = await this.getAsync($key);
            return res;
        } catch ($err) {
            console.log($err);
            return null;
        }
    }
}