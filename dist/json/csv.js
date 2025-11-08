"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenObject = flattenObject;
exports.jsonToCsv = jsonToCsv;
exports.ExcellFile = ExcellFile;
const fs_1 = require("fs");
/**
 * Flatten nested JSON
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
 * Convert JSON array to CSV string
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
 * Save JSON as Excel (CSV) file
 */
function ExcellFile(filename, data) {
    const csv = jsonToCsv(data);
    (0, fs_1.writeFileSync)(filename, csv, "utf8");
}
//# sourceMappingURL=csv.js.map