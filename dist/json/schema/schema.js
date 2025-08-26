"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const advanced_1 = __importDefault(require("./advanced"));
/**
 * Class representing a schema for JSON data, similar to Mongoose schema.
 * Extends AdvancedSchema for type validation, defaults, and saving.
 */
class Schema extends advanced_1.default {
    /**
     * Create a new Schema instance.
     * @param {SchemaDefinition} object - The schema definition.
     * @param {string} schemaPath - Path to the JSON file.
     */
    constructor(object, schemaPath) {
        super({ object, path: schemaPath });
        this.Schema = object;
        this.Path =
            schemaPath || `./schema_${Math.random().toString(36).substring(7)}.json`;
        this.ensurePathExists();
        this.validateExtraFields(object);
        this.validateEnum(object);
    }
    /**
     * Ensures that the directory and file exist.
     * Creates them if they don't exist.
     */
    ensurePathExists() {
        const dir = node_path_1.default.dirname(this.Path);
        if (!node_fs_1.default.existsSync(dir))
            node_fs_1.default.mkdirSync(dir, { recursive: true });
        if (!node_fs_1.default.existsSync(this.Path))
            node_fs_1.default.writeFileSync(this.Path, JSON.stringify({}, null, 2));
    }
    /**
     * Validates enum values in the data against the schema.
     * @param {Record<string, any>} data - Data to validate.
     * @throws Will throw an error if a value is not in the enum.
     */
    validateEnum(data) {
        for (const key in this.Schema) {
            const field = this.Schema[key];
            if (field.enum && !field.enum.includes(data[key]))
                throw new Error(`Field "${key}" must be one of: ${field.enum.join(", ")}`);
        }
    }
    /**
     * Validates that all keys in the data exist in the schema.
     * @param {Record<string, any>} data - Data to validate.
     * @throws Will throw an error if extra fields are present.
     */
    validateExtraFields(data) {
        for (const key in data) {
            if (!this.Schema[key])
                throw new Error(`Field "${key}" is not defined in the schema`);
        }
    }
}
exports.default = Schema;
//# sourceMappingURL=schema.js.map