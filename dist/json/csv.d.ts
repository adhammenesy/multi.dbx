/**
 * Recursively flattens a nested JSON object.
 * Nested objects are converted to dot-separated keys.
 *
 * @param obj - The object to flatten.
 * @param prefix - Internal prefix used during recursion (optional).
 * @returns A flat object where nested keys are dot-separated.
 *
 * @example
 * flattenObject({ a: { b: 1 }, c: 2 });
 * // Returns: { "a.b": 1, "c": 2 }
 */
export declare function flattenObject(obj: any, prefix?: string): Record<string, any>;
/**
 * Converts an array of JSON objects to a CSV string.
 * Nested objects are flattened using `flattenObject`
 *
 * @param data - Array of JSON objects to convert.
 * @returns A string in CSV format.
 *
 * @example
 * jsonToCsv([{ a: 1, b: { c: 2 } }]);
 * // Returns:
 * // "a,b.c"
 * // "1,2"
 */
export declare function jsonToCsv(data: any[]): string;
/**
 * Saves an array of JSON objects as a CSV file.
 * Nested objects are automatically flattened.
 *
 * @param filename - The name of the CSV file to create.
 * @param data - Array of JSON objects to save.
 *
 * @example
 * ExcellFile("output.csv", [{ name: "John", age: 30 }]);
 * // Creates "output.csv" with the CSV content:
 * // "name,age"
 * // "John,30"
 */
export declare function ExcellFile(filename: string, data: any[]): void;
//# sourceMappingURL=csv.d.ts.map