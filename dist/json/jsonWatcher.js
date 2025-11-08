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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const node_events_1 = require("node:events");
const fs = __importStar(require("node:fs"));
class JsonWatcher extends node_events_1.EventEmitter {
    constructor(db) {
        super();
        this.db = db;
        this.lastSnapshot = {};
        this.readyPromise = this.initSnapshot();
    }
    async waitReady() {
        await this.readyPromise;
    }
    async initSnapshot() {
        try {
            const result = this.db.fetchAll?.() || this.db.get?.();
            this.lastSnapshot = result instanceof Promise ? await result : result || {};
        }
        catch {
            this.lastSnapshot = {};
        }
    }
    async fetchCurrent() {
        try {
            const result = this.db.fetchAll?.() || this.db.get?.();
            return result instanceof Promise ? await result : result || {};
        }
        catch {
            return {};
        }
    }
    start() {
        let path;
        if (typeof this.db.details === "function") {
            path = this.db.details().path;
        }
        else if ("path" in this.db) {
            path = this.db.path;
        }
        else {
            throw new TypeError("Database object must have either a 'details()' method or a 'path' property");
        }
        fs.watchFile(path, { interval: 300 }, async () => {
            try {
                const current = await this.fetchCurrent();
                const prev = this.lastSnapshot;
                const added = [];
                const updated = [];
                const removed = [];
                for (const key of Object.keys(current)) {
                    if (!(key in prev))
                        added.push(key);
                    else if (JSON.stringify(current[key]) !== JSON.stringify(prev[key]))
                        updated.push(key);
                }
                for (const key of Object.keys(prev)) {
                    if (!(key in current))
                        removed.push(key);
                }
                if (added.length || updated.length || removed.length) {
                    const evt = {
                        type: "change",
                        data: current,
                        diff: { added, updated, removed },
                    };
                    this.emit("change", evt);
                    if (added.length)
                        this.emit("add", { type: "add", data: current, diff: { added } });
                    if (updated.length)
                        this.emit("update", { type: "update", data: current, diff: { updated } });
                    if (removed.length)
                        this.emit("remove", { type: "remove", data: current, diff: { removed } });
                    this.lastSnapshot = current;
                }
                else if (Object.keys(current).length === 0 && Object.keys(prev).length > 0) {
                    this.emit("clear", { type: "clear", data: current });
                    this.lastSnapshot = current;
                }
            }
            catch (err) {
                const evt = { type: "error", message: "Failed to read database", error: err };
                this.emit("error", evt);
            }
        });
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
}
exports.default = JsonWatcher;
//# sourceMappingURL=jsonWatcher.js.map