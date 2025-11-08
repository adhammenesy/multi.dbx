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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoHash = exports.Plugins = exports.Schema = exports.JsonWatcher = exports.JsonData = void 0;
var index_1 = require("./json/index");
Object.defineProperty(exports, "JsonData", { enumerable: true, get: function () { return __importDefault(index_1).default; } });
var jsonWatcher_1 = require("./json/jsonWatcher");
Object.defineProperty(exports, "JsonWatcher", { enumerable: true, get: function () { return __importDefault(jsonWatcher_1).default; } });
var schema_1 = require("./json/schema/schema");
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return __importDefault(schema_1).default; } });
var plugins_1 = require("./plugins");
Object.defineProperty(exports, "Plugins", { enumerable: true, get: function () { return __importDefault(plugins_1).default; } });
var hashing_1 = require("./plugins/hashing");
Object.defineProperty(exports, "AutoHash", { enumerable: true, get: function () { return __importDefault(hashing_1).default; } });
__exportStar(require("../types/Schema.d"), exports);
__exportStar(require("../types/jsonDb.d"), exports);
__exportStar(require("../types/plugins.d"), exports);
//# sourceMappingURL=index.js.map