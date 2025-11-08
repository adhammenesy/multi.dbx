import AdvancedSchema from "./advanced";
import { SchemaDefinition } from "../../../types/Schema";
/**
 * Class representing a schema for JSON data, similar to Mongoose schema.
 * Extends AdvancedSchema for type validation, defaults, and saving.
 */
export default class Schema<T extends Record<string, any>> extends AdvancedSchema<T> {
    /** The schema definition object */
    Schema: SchemaDefinition<T>;
    /** Path to the JSON file where data is stored */
    Path: string;
    /**
     * Create a new Schema instance.
     * @param {T} object - The schema definition.
     * @param {string} schemaPath - Path to the JSON file.
     */
    constructor(object: SchemaDefinition<T>, schemaPath: string);
    /**
     * Ensures that the directory and file exist.
     * Creates them if they don't exist.
     */
    private ensurePathExists;
    /**
     * Validates enum values in the data against the schema.
     * @param {Record<string, any>} data - Data to validate.
     * @throws Will throw an error if a value is not in the enum.
     */
    private validateEnum;
    /**
     * Validates that all keys in the data exist in the schema.
     * @param {Record<string, any>} data - Data to validate.
     * @throws Will throw an error if extra fields are present.
     */
    private validateExtraFields;
}
//# sourceMappingURL=schema.d.ts.map