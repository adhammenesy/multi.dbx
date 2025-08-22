"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const terminal_1 = require("../terminal");
class JsonDbError extends Error {
    constructor(message) {
        super(message);
        this.name = "JsonDbError";
    }
}
/**
 * Represents a simple JSON-based database.
 */
class JsonData {
    constructor() {
        this.dbPath = null;
        this.connected = false;
    }
    /**
     * Connects to a JSON file database.
     * @param filePath Path to the JSON file.
     * @throws {JsonDbError} If the path is not defined or file does not exist.
     */
    connect(filePath) {
        if (!filePath)
            throw new JsonDbError("Database path is not defined");
        const fixedPath = filePath.endsWith(".json")
            ? filePath
            : `${filePath}.json`;
        if (!fs.existsSync(fixedPath))
            throw new JsonDbError(`Database file not found: ${fixedPath}`);
        this.dbPath = path.resolve(fixedPath);
        this.connected = true;
        console.log(`${terminal_1.color.green}JsonDb Connected Successfully → ${terminal_1.color.red}( ${this.dbPath} )${terminal_1.color.reset}`);
    }
    /**
     * Returns database details including path, connection status, and approximate line count.
     */
    details() {
        this.ensureConnected();
        const content = this.readFile();
        const lines = content.split("\n").length;
        return {
            path: this.dbPath,
            isConnected: this.connected,
            DbLinesCount: Math.max(0, lines - 2),
        };
    }
    /**
     * Fetches a value from the database by key/path.
     * @param key Nested key or path, e.g., "users[0].name"
     * @returns The value at the specified key, or undefined if not found.
     */
    fetch(key) {
        this.ensureConnected();
        this.ensureKey(key);
        const file = this.readJson();
        return getFromJson(file, key);
    }
    /**
     * Sets a value at the specified key/path.
     * @param key Nested key or path.
     * @param value Value to set.
     */
    set(key, value) {
        this.ensureConnected();
        this.ensureKey(key);
        const file = this.readJson();
        this.setNested(file, key, value);
        this.writeJson(file);
    }
    /**
     * Checks if a key exists in the database.
     * @param key Key or path to check.
     * @returns True if key exists, false otherwise.
     */
    has(key) {
        this.ensureConnected();
        this.ensureKey(key);
        const file = this.readJson();
        return getFromJson(file, key) !== undefined;
    }
    /**
     * Returns the entire database as an object.
     */
    fetchAll() {
        this.ensureConnected();
        return this.readJson();
    }
    /**
     * Deletes a key from the database.
     * @param key Key or path to delete.
     */
    delete(key) {
        this.ensureConnected();
        this.ensureKey(key);
        const file = this.readJson();
        this.deleteNested(file, key);
        this.writeJson(file);
    }
    /**
     * Adds a numeric value to an existing number at the key, or initializes it.
     * @param key Key/path for the numeric value.
     * @param value Value to add.
     */
    add(key, value) {
        this.ensureConnected();
        this.ensureKey(key);
        if (isNaN(value))
            throw new JsonDbError("Value must be numeric");
        const file = this.readJson();
        const current = (getFromJson(file, key) ?? 0);
        this.setNested(file, key, current + value);
        this.writeJson(file);
    }
    /**
     * Subtracts a numeric value from a key.
     * @param key Key/path for the numeric value.
     * @param value Value to subtract.
     */
    subtract(key, value) {
        this.ensureConnected();
        this.ensureKey(key);
        if (typeof value !== "number")
            throw new JsonDbError("Value must be numeric");
        const file = this.readJson();
        const current = getFromJson(file, key);
        if (typeof current !== "number")
            throw new JsonDbError(`Key "${key}" must be a number`);
        this.setNested(file, key, current - value);
        this.writeJson(file);
    }
    /**
     * Resets the database to an empty object.
     */
    reset() {
        this.ensureConnected();
        this.writeJson({});
    }
    /**
     * Returns all database entries as key-value pairs.
     */
    all() {
        this.ensureConnected();
        const file = this.readJson();
        return Object.entries(file);
    }
    /**
     * Pushes a value into an array at the specified key. Creates array if not exists.
     * @param key Key/path for the array.
     * @param value Value to push.
     */
    push(key, value) {
        this.ensureConnected();
        const file = this.readJson();
        const arr = getFromJson(file, key);
        if (!arr)
            this.setNested(file, key, [value]);
        else if (Array.isArray(arr)) {
            arr.push(value);
            this.setNested(file, key, arr);
        }
        else
            this.setNested(file, key, [value]);
        this.writeJson(file);
    }
    /**
     * Performs a math operation on a numeric key.
     * @param key Key/path of the number.
     * @param operator "+", "-", "*", "/", or "%" operator.
     * @param value Number to operate with.
     */
    math(key, operator, value) {
        this.ensureConnected();
        this.ensureKey(key);
        if (isNaN(value))
            throw new JsonDbError("Value must be numeric");
        const file = this.readJson();
        const current = getFromJson(file, key);
        if (typeof current !== "number")
            throw new JsonDbError(`Key "${key}" must be a number`);
        let result = current;
        switch (operator) {
            case "+":
                result += value;
                break;
            case "-":
                result -= value;
                break;
            case "*":
                result *= value;
                break;
            case "/":
                result /= value;
                break;
            case "%":
                result %= value;
                break;
        }
        this.setNested(file, key, result);
        this.writeJson(file);
    }
    get(filter) {
        this.ensureConnected();
        const file = this.readJson();
        if (typeof filter === "string")
            return getFromJson(file, filter);
        const matches = (obj, filterObj) => {
            return Object.entries(filterObj).every(([k, v]) => {
                const val = k.includes(".") ? getFromJson(obj, k) : obj[k];
                return val === v;
            });
        };
        const searchDeep = (obj) => {
            if (obj === null || typeof obj !== "object")
                return undefined;
            if (Array.isArray(obj)) {
                for (const item of obj) {
                    const found = searchDeep(item);
                    if (found)
                        return found;
                }
            }
            else {
                if (matches(obj, filter))
                    return obj;
                for (const value of Object.values(obj)) {
                    if (value && typeof value === "object") {
                        const found = searchDeep(value);
                        if (found)
                            return found;
                    }
                }
            }
            return undefined;
        };
        return searchDeep(file);
    }
    matchesFilter(target, filter) {
        for (const [filterPath, filterValue] of Object.entries(filter)) {
            const targetValue = getFromJson(target, filterPath);
            if (targetValue !== filterValue)
                return false;
        }
        return true;
    }
    ensureConnected() {
        if (!this.connected || !this.dbPath)
            throw new JsonDbError("Database not connected. Use db.connect(path)");
    }
    ensureKey(key) {
        if (!key)
            throw new JsonDbError("Key is not defined");
    }
    readFile() {
        if (!this.dbPath)
            return "{}";
        try {
            return fs.existsSync(this.dbPath)
                ? fs.readFileSync(this.dbPath, "utf8")
                : "{}";
        }
        catch {
            return "{}";
        }
    }
    readJson() {
        try {
            return JSON.parse(this.readFile());
        }
        catch {
            return {};
        }
    }
    writeJson(data) {
        fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
    }
    setNested(obj, path, value) {
        const parts = [];
        const regex = /([^\.\[\]]+)|\[(\d+)\]/g;
        let match;
        while ((match = regex.exec(path)) !== null) {
            if (match[1])
                parts.push(match[1]);
            else if (match[2])
                parts.push(Number(match[2]));
        }
        let current = obj;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (i === parts.length - 1)
                current[part] = value;
            else {
                if (current[part] === undefined)
                    current[part] = typeof parts[i + 1] === "number" ? [] : {};
                current = current[part];
            }
        }
    }
    deleteNested(obj, path) {
        const parts = [];
        const regex = /([^\.\[\]]+)|\[(\d+)\]/g;
        let match;
        while ((match = regex.exec(path)) !== null) {
            if (match[1])
                parts.push(match[1]);
            else if (match[2])
                parts.push(Number(match[2]));
        }
        let current = obj;
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (current[part] === undefined)
                return;
            current = current[part];
        }
        delete current[parts[parts.length - 1]];
    }
}
exports.default = JsonData;
/**
 * Safely retrieves a nested value from an object using a path string.
 * @param json Object to traverse.
 * @param input Path string, e.g., "users[0].name"
 */
function getFromJson(json, input) {
    const parts = [];
    const regex = /([^\.\[\]]+)|\[(\d+)\]/g;
    let match;
    while ((match = regex.exec(input)) !== null) {
        if (match[1])
            parts.push(match[1]);
        else if (match[2])
            parts.push(Number(match[2]));
    }
    let result = json;
    for (const part of parts) {
        if (result === undefined || result === null)
            return undefined;
        if (typeof part === "number" && !Array.isArray(result))
            return undefined;
        result = result[part];
    }
    return result;
}
//# sourceMappingURL=index.js.map