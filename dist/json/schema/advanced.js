"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const ajv_1 = __importDefault(require("ajv"));
const path_1 = require("path");
const plugins_1 = require("../../plugins");
const csv_1 = require("../../json/csv");
/**
 * AdvancedSchema - JSON Schema handler with validation and persistence
 */
class AdvancedSchema {
    /**
     * @param data Schema definition options or { object }
     * @param path Optional database file path (when using { object } only)
     * @throws {TypeError} If schema definition is invalid
     */
    constructor(data, path) {
        if (path) {
            if (!data || typeof data !== "object" || !("object" in data)) {
                throw new TypeError("Missing schema definition (object).");
            }
            this.path = path;
            this.object = data.object;
        }
        else {
            const opts = data;
            if (!opts || typeof opts !== "object")
                throw new TypeError("Missing parameters or schema must be an object");
            if (!opts.object ||
                typeof opts.object !== "object" ||
                !opts.path ||
                typeof opts.path !== "string")
                throw new TypeError("Missing parameters or schema must be an object");
            this.path = opts.path;
            this.object = opts.object;
        }
        this.ajv = new ajv_1.default({ allErrors: true, useDefaults: true });
    }
    /**
     * Generate a random unique database ID
     * @returns {string} Unique ID
     */
    generateId() {
        const randomNum = Math.floor(Math.random() * 90000) + 10000;
        const randomStr = Math.random().toString(36).substring(2, 12);
        return `${randomNum}_${randomStr}`;
    }
    /**
     * Build JSON Schema from definition
     * @returns {object} JSON Schema object
     */
    buildJsonSchema() {
        const properties = {};
        const required = [];
        for (const key in this.object) {
            const field = this.object[key];
            if (!field.type)
                throw new TypeError(`Missing type for field: "${key}"`);
            const prop = { type: field.type };
            if (field.enum)
                prop.enum = field.enum;
            if (field.default !== undefined)
                prop.default = field.default;
            properties[key] = prop;
            if (field.required)
                required.push(key);
        }
        return { type: "object", properties, required, additionalProperties: true };
    }
    /**
     * Ensure the database file exists
     */
    async ensureFileExists() {
        try {
            await promises_1.default.access(this.path);
        }
        catch {
            await promises_1.default.writeFile(this.path, JSON.stringify({}, null, 2));
        }
    }
    /**
    * Create a new entry in the database
    * @param {Record<any, any>} data Input object to validate and save
    * @returns {Promise<{ data: Record<any, any> }>} Created entry
    * @throws {TypeError} If validation fails
    */
    async create(data) {
        await this.ensureFileExists();
        const Plugins = ["AutoHash"];
        Plugins.forEach((Plugin) => {
            const PluginData = plugins_1.PluginsData.get(Plugin);
            const Keys = Object.keys(data);
            const values = Object.values(data);
            Keys.forEach((Key, Index) => {
                if (PluginData.config[0].keywords.includes(Key)) {
                    data[Key] = PluginData.run(values[Index]);
                }
            });
        });
        const schema = this.buildJsonSchema();
        const validate = this.ajv.compile(schema);
        const mergedData = {
            ...Object.fromEntries(Object.entries(this.object).map(([k, v]) => [k, v.default])),
            ...data,
        };
        const valid = validate(mergedData);
        if (!valid)
            throw new TypeError(JSON.stringify(validate.errors, null, 2));
        const existingDataRaw = await promises_1.default.readFile(this.path, "utf-8");
        console.log(existingDataRaw);
        const existingData = JSON.parse(existingDataRaw);
        const newId = this.generateId();
        mergedData._dbid = String(newId);
        existingData[newId] = mergedData;
        await promises_1.default.writeFile(this.path, JSON.stringify(existingData, null, 2), "utf-8");
        return { data: mergedData };
    }
    /**
     * Get all entries from the database
     * @returns {Promise<SchemaDefinition<T>>} All entries without $schema
     */
    async get() {
        await this.ensureFileExists();
        const data = JSON.parse(await promises_1.default.readFile(this.path, "utf-8"));
        const { $schema, ...entries } = data;
        return entries;
    }
    /**
     * Get entry by ID
     * @param {string} id Database ID
     * @returns {Promise<SchemaDefinition<T> | null>} Entry or null if not found
     */
    async getById(id) {
        await this.ensureFileExists();
        const data = JSON.parse(await promises_1.default.readFile(this.path, "utf-8"));
        return data[id] || null;
    }
    /**
     * Find entries that match a given key-value pair
     * @param {SchemaDefinition<T>} query Object with a single key-value to match
     * @returns {Promise<SchemaDefinition<T> | SchemaDefinition<T>[] | null>} Single entry object or array of entries
     */
    async find(query) {
        await this.ensureFileExists();
        const raw = await promises_1.default.readFile(this.path, "utf-8");
        const parsedData = JSON.parse(raw);
        const { $schema, ...entries } = parsedData;
        const [searchKey, searchValue] = Object.entries(query)[0];
        const results = [];
        for (const id in entries) {
            const entry = entries[id];
            if (entry[searchKey] === searchValue)
                results.push(entry);
        }
        if (results.length === 0)
            return null;
        return results;
    }
    /**
     * Update an entry by ID
     * @param {string} id Database ID
     * @param {Record<any, any>} updates Key-value pairs to update
     * @returns {Promise<Record<any, any>>} Updated entry
     * @throws {TypeError} If ID not found or type mismatch
     */
    async update(id, updates) {
        await this.ensureFileExists();
        const data = JSON.parse(await promises_1.default.readFile(this.path, "utf-8"));
        if (!data[id])
            throw new TypeError(`Entry with ID "${id}" not found.`);
        const entry = data[id];
        for (const [key, value] of Object.entries(updates)) {
            if (!(key in this.object))
                throw new TypeError(`Key "${key}" is not defined in schema.`);
            const expectedType = this.object[key].type;
            if (typeof value !== expectedType)
                throw new TypeError(`Type mismatch for key "${key}". Expected ${expectedType}, got ${typeof value}`);
            entry[key] = value;
        }
        data[id] = entry;
        await promises_1.default.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
        return entry;
    }
    /**
     * Delete entry or field from database
     * @param {string} id Database ID
     * @param {Record<any, any>} [field] Optional key-value pair to delete a specific field
     * @returns {Promise<boolean>} True if deleted successfully
     * @throws {TypeError} If ID or field not found
     */
    async delete(id, field) {
        await this.ensureFileExists();
        const data = JSON.parse(await promises_1.default.readFile(this.path, "utf-8"));
        if (!data[id])
            throw new TypeError(`Entry with ID "${id}" not found.`);
        if (!field) {
            delete data[id];
            await promises_1.default.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
            return true;
        }
        const [targetKey, targetValue] = Object.entries(field)[0];
        const entry = data[id];
        if (!(targetKey in entry))
            throw new TypeError(`Key "${targetKey}" not found in entry with ID "${id}".`);
        if (entry[targetKey] !== targetValue)
            throw new TypeError(`Value mismatch for key "${targetKey}". Expected ${targetValue}, got ${entry[targetKey]}`);
        delete entry[targetKey];
        data[id] = entry;
        await promises_1.default.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
        return true;
    }
    /**
     * Push a value into an array field of an entry
     * @param {string} id Database ID
     * @param {string} key Array field key
     * @param {*} value Value to push into the array
     * @returns {Promise<Record<any, any>>} Updated entry
     * @throws {TypeError} If entry, key, or array type is invalid
     */
    async push(id, key, value) {
        await this.ensureFileExists();
        const dataRaw = await promises_1.default.readFile(this.path, "utf-8");
        const data = JSON.parse(dataRaw);
        if (!data[id])
            throw new TypeError(`Entry with ID "${id}" not found.`);
        const entry = data[id];
        if (!(key in this.object))
            throw new TypeError(`Key "${key}" not in schema.`);
        if (!Array.isArray(entry[key]))
            throw new TypeError(`Key "${key}" is not an array.`);
        entry[key].push(value);
        data[id] = entry;
        await promises_1.default.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
        return entry;
    }
    async toCsv() {
        const filename = (0, path_1.basename)(this.path).replace(".json", ".csv");
        const rawData = await promises_1.default.readFile(this.path, "utf-8");
        const db = JSON.parse(rawData);
        // ناخد القيم بس بدون الـ keys
        const dataArray = Object.values(db);
        // لو ExcellFile محتاج array من objects
        (0, csv_1.ExcellFile)(filename, dataArray);
    }
}
exports.default = AdvancedSchema;
//# sourceMappingURL=advanced.js.map