"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptJson = exports.buildJson = void 0;
const buildJson = (json) => {
    const jsonString = JSON.stringify(json);
    let encrypted = '';
    for (let i = 0; i < jsonString.length; i++) {
        encrypted += String.fromCharCode(jsonString.charCodeAt(i) + 1);
    }
    return encrypted;
};
exports.buildJson = buildJson;
const decryptJson = (encrypted) => {
    let decrypted = '';
    for (let i = 0; i < encrypted.length; i++) {
        decrypted += String.fromCharCode(encrypted.charCodeAt(i) - 1);
    }
    return JSON.parse(decrypted);
};
exports.decryptJson = decryptJson;
//# sourceMappingURL=build.js.map