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
class JsonData {
    constructor() {
        this.dbPath = null;
        this.connected = false;
    }
    /**
     * Connect to JSON DB
     */
    connect(filePath) {
        if (!filePath)
            throw new JsonDbError("Database path is not defined");
        const fixedPath = filePath.endsWith(".json")
            ? filePath
            : `${filePath}.json`;
        if (!fs.existsSync(fixedPath)) {
            throw new JsonDbError(`Database file not found: ${fixedPath}`);
        }
        this.dbPath = path.resolve(fixedPath);
        this.connected = true;
        console.log(`${terminal_1.color.green}JsonDb Connected Successfully → ${terminal_1.color.red}( ${this.dbPath} )${terminal_1.color.reset}`);
    }
    /**
     * Database details
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
     * Set key/value
     */
    set(key, value) {
        this.ensureConnected();
        this.ensureKey(key);
        const file = this.readJson();
        file[key] = value;
        const tmpPath = this.dbPath + ".tmp";
        fs.writeFileSync(tmpPath, JSON.stringify(file, null, 2), "utf-8");
        fs.renameSync(tmpPath, this.dbPath);
    }
    /**
     * Fetch value
     */
    fetch(key) {
        this.ensureConnected();
        this.ensureKey(key);
        const file = this.readJson();
        return file[key];
    }
    /**
     * Has key
     */
    has(key) {
        this.ensureConnected();
        this.ensureKey(key);
        const file = this.readJson();
        return Object.prototype.hasOwnProperty.call(file, key);
    }
    /**
     * Fetch all
     */
    fetchAll() {
        this.ensureConnected();
        return this.readJson();
    }
    /**
     * Delete key
     */
    delete(key) {
        this.ensureConnected();
        this.ensureKey(key);
        const file = this.readJson();
        if (!this.has(key))
            throw new JsonDbError(`Key "${key}" does not exist`);
        delete file[key];
        this.writeJson(file);
    }
    /**
     * Backup DB
     */
    backup(filepath) {
        this.ensureConnected();
        if (!filepath)
            throw new JsonDbError("Backup filepath not provided");
        const file = this.readJson();
        const dest = filepath.endsWith(".json") ? filepath : `${filepath}.json`;
        fs.writeFileSync(dest, JSON.stringify(file, null, 2));
    }
    /**
     * Add numeric value
     */
    add(key, value) {
        this.ensureConnected();
        this.ensureKey(key);
        if (isNaN(value))
            throw new JsonDbError("Value must be numeric");
        const file = this.readJson();
        file[key] = (file[key] ?? 0) + value;
        this.writeJson(file);
    }
    /**
     * Subtract numeric value
     */
    subtract(key, value) {
        this.ensureConnected();
        this.ensureKey(key);
        if (typeof value !== "number")
            throw new JsonDbError("Value must be numeric");
        const current = this.fetch(key);
        if (typeof current !== "number") {
            throw new JsonDbError(`Key "${key}" must be a number`);
        }
        const file = this.readJson();
        file[key] -= value;
        this.writeJson(file);
    }
    /**
     * Reset DB
     */
    reset() {
        this.ensureConnected();
        this.writeJson({});
    }
    /**
     * Get all as array
     */
    all() {
        this.ensureConnected();
        const file = this.readJson();
        return Object.entries(file);
    }
    /**
     * Push value to array
     */
    push(key, value) {
        this.ensureConnected();
        const file = this.readJson();
        if (!file[key]) {
            file[key] = [value];
        }
        else if (Array.isArray(file[key])) {
            file[key].push(value);
        }
        else {
            file[key] = [value];
        }
        this.writeJson(file);
    }
    /**
     * Math operations
     */
    math(key, operator, value) {
        this.ensureConnected();
        this.ensureKey(key);
        if (isNaN(value))
            throw new JsonDbError("Value must be numeric");
        const current = this.fetch(key);
        if (typeof current !== "number") {
            throw new JsonDbError(`Key "${key}" must be a number`);
        }
        const file = this.readJson();
        switch (operator) {
            case "+":
                file[key] += value;
                break;
            case "-":
                file[key] -= value;
                break;
            case "*":
                file[key] *= value;
                break;
            case "/":
                file[key] /= value;
                break;
            case "%":
                file[key] %= value;
                break;
        }
        this.writeJson(file);
    }
    /**
     * Get by key
     */
    get(key) {
        return this.fetch(key);
    }
    /* -------------------- PRIVATE HELPERS -------------------- */
    ensureConnected() {
        if (!this.connected || !this.dbPath) {
            throw new JsonDbError("Database not connected. Use db.connect(path)");
        }
    }
    ensureKey(key) {
        if (!key)
            throw new JsonDbError("Key is not defined");
    }
    readFile() {
        return fs.existsSync(this.dbPath)
            ? fs.readFileSync(this.dbPath, "utf8")
            : "{}";
    }
    readJson() {
        return JSON.parse(this.readFile());
    }
    writeJson(data) {
        fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
    }
}
exports.default = JsonData;
//# sourceMappingURL=index.js.map