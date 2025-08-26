import Ajv from "ajv";
import { AdvancedSchemaOptions, Def } from "../../types/Schema";
/**
 * AdvancedSchema - JSON Schema handler with validation and persistence
 */
export default class AdvancedSchema {
    path: string;
    object: Def;
    ajv: Ajv;
    /**
     * @param data Schema definition options or { object }
     * @param path Optional database file path (when using { object } only)
     * @throws {TypeError} If schema definition is invalid
     */
    constructor(data: AdvancedSchemaOptions | {
        object: Def;
    }, path?: string);
    /**
     * Generate a random unique database ID
     * @returns {string} Unique ID
     */
    private generateId;
    /**
     * Build JSON Schema from definition
     * @returns {object} JSON Schema object
     */
    private buildJsonSchema;
    /**
     * Ensure the database file exists
     */
    private ensureFileExists;
    /**
     * Create a new entry in the database
     * @param {Record<string, any>} data Input object to validate and save
     * @returns {Promise<{ data: Record<string, any> }>} Created entry
     * @throws {TypeError} If validation fails
     */
    create(data: Record<string, any>): Promise<{
        data: {
            [x: string]: unknown;
        } & {};
    }>;
    /**
     * Get all entries from the database
     * @returns {Promise<Record<string, any>>} All entries without $schema
     */
    get(): Promise<Record<string, any>>;
    /**
     * Get entry by ID
     * @param {string} id Database ID
     * @returns {Promise<Record<string, any> | null>} Entry or null if not found
     */
    getById(id: string): Promise<Record<string, any> | null>;
    /**
     * Find entries that match a given key-value pair
     * @param {Record<string, any>} query Object with a single key-value to match
     * @returns {Promise<Record<string, any> | Record<string, any>[] | null>} Single entry object or array of entries
     */
    find(query: Record<string, any>): Promise<Record<string, any> | Record<string, any>[] | null>;
    /**
     * Update an entry by ID
     * @param {string} id Database ID
     * @param {Record<string, any>} updates Key-value pairs to update
     * @returns {Promise<Record<string, any>>} Updated entry
     * @throws {TypeError} If ID not found or type mismatch
     */
    update(id: string, updates: Record<string, any>): Promise<Record<string, any>>;
    /**
     * Delete entry or field from database
     * @param {string} id Database ID
     * @param {Record<string, any>} [field] Optional key-value pair to delete a specific field
     * @returns {Promise<boolean>} True if deleted successfully
     * @throws {TypeError} If ID or field not found
     */
    delete(id: string, field?: Record<string, any>): Promise<boolean>;
    /**
     * Push a value into an array field of an entry
     * @param {string} id Database ID
     * @param {string} key Array field key
     * @param {*} value Value to push into the array
     * @returns {Promise<Record<string, any>>} Updated entry
     * @throws {TypeError} If entry, key, or array type is invalid
     */
    push(id: string, key: string, value: any): Promise<Record<string, any>>;
}
//# sourceMappingURL=advanced.d.ts.map