"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenObject = flattenObject;
exports.jsonToCsv = jsonToCsv;
exports.ExcellFile = ExcellFile;
const fs_1 = require("fs");
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
function flattenObject(obj, prefix = "") {
    let result = {};
    for (const key in obj) {
        if (!obj.hasOwnProperty(key))
            continue;
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === "object" && !Array.isArray(value)) {
            Object.assign(result, flattenObject(value, newKey));
        }
        else {
            result[newKey] = value;
        }
    }
    return result;
}
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
function jsonToCsv(data) {
    if (!data.length)
        return "";
    const flatData = data.map(item => flattenObject(item));
    const headers = Array.from(new Set(flatData.flatMap(d => Object.keys(d))));
    const rows = flatData.map(row => headers.map(h => `"${row[h] ?? ""}"`).join(","));
    return [headers.join(","), ...rows].join("\n");
}
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
function ExcellFile(filename, data) {
    const csv = jsonToCsv(data);
    (0, fs_1.writeFileSync)(filename, csv, "utf8");
}
//# sourceMappingURL=csv.js.map