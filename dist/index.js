"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.JsonWatcher = exports.JsonData = void 0;
var index_1 = require("./json/index");
Object.defineProperty(exports, "JsonData", { enumerable: true, get: function () { return __importDefault(index_1).default; } });
var jsonWatcher_1 = require("./json/jsonWatcher");
Object.defineProperty(exports, "JsonWatcher", { enumerable: true, get: function () { return __importDefault(jsonWatcher_1).default; } });
var schema_1 = require("./json/schema/schema");
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return __importDefault(schema_1).default; } });
//# sourceMappingURL=index.js.map