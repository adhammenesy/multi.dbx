export default class JsonData {
    private dbPath;
    private connected;
    /**
     * Connect to JSON DB
     */
    connect(filePath: string): void;
    /**
     * Database details
     */
    details(): DbDetails;
    /**
     * Set key/value
     */
    set<T = any>(key: string, value: T): void;
    /**
     * Fetch value
     */
    fetch<T = any>(key: string): T | undefined;
    /**
     * Has key
     */
    has(key: string): boolean;
    /**
     * Fetch all
     */
    fetchAll(): Record<string, any>;
    /**
     * Delete key
     */
    delete(key: string): void;
    /**
     * Backup DB
     */
    backup(filepath: string): void;
    /**
     * Add numeric value
     */
    add(key: string, value: number): void;
    /**
     * Subtract numeric value
     */
    subtract(key: string, value: number): void;
    /**
     * Reset DB
     */
    reset(): void;
    /**
     * Get all as array
     */
    all(): [string, any][];
    /**
     * Push value to array
     */
    push<T = any>(key: string, value: T): void;
    /**
     * Math operations
     */
    math(key: string, operator: MathOperator, value: number): void;
    /**
     * Get by key
     */
    get<T = any>(key: string): T | undefined;
    private ensureConnected;
    private ensureKey;
    private readFile;
    private readJson;
    private writeJson;
}
