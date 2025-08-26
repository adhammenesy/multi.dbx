import { DbDetails } from "../types/jsonDb";
/**
 * Represents a simple JSON-based database.
 */
export default class JsonData {
    private dbPath;
    private connected;
    /**
     * Connects to a JSON file database.
     * @param filePath Path to the JSON file.
     * @throws {JsonDbError} If the path is not defined or file does not exist.
     */
    connect(filePath: string): void;
    /**
     * Returns database details including path, connection status, and approximate line count.
     */
    details(): DbDetails;
    /**
     * Fetches a value from the database by key/path.
     * @param key Nested key or path, e.g., "users[0].name"
     * @returns The value at the specified key, or undefined if not found.
     */
    fetch<T = any>(key: string): T | undefined;
    /**
     * Sets a value at the specified key/path.
     * @param key Nested key or path.
     * @param value Value to set.
     */
    set<T = any>(key: string, value: T): void;
    /**
     * Checks if a key exists in the database.
     * @param key Key or path to check.
     * @returns True if key exists, false otherwise.
     */
    has(key: string): boolean;
    /**
     * Returns the entire database as an object.
     */
    fetchAll(): Record<string, any>;
    /**
     * Deletes a key from the database.
     * @param key Key or path to delete.
     */
    delete(key: string): void;
    /**
     * Adds a numeric value to an existing number at the key, or initializes it.
     * @param key Key/path for the numeric value.
     * @param value Value to add.
     */
    add(key: string, value: number): void;
    /**
     * Subtracts a numeric value from a key.
     * @param key Key/path for the numeric value.
     * @param value Value to subtract.
     */
    subtract(key: string, value: number): void;
    /**
     * Resets the database to an empty object.
     */
    reset(): void;
    /**
     * Returns all database entries as key-value pairs.
     */
    all(): [string, any][];
    /**
     * Pushes a value into an array at the specified key. Creates array if not exists.
     * @param key Key/path for the array.
     * @param value Value to push.
     */
    push<T = any>(key: string, value: T): void;
    /**
     * Performs a math operation on a numeric key.
     * @param key Key/path of the number.
     * @param operator "+", "-", "*", "/", or "%" operator.
     * @param value Number to operate with.
     */
    math(key: string, operator: "+" | "-" | "*" | "/" | "%", value: number): void;
    get<T = any>(filter: string | Record<string, any>): T | undefined;
    private matchesFilter;
    private ensureConnected;
    private ensureKey;
    private readFile;
    private readJson;
    private writeJson;
    private setNested;
    private deleteNested;
}
//# sourceMappingURL=index.d.ts.map