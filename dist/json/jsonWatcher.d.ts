import { EventEmitter } from "node:events";
import JsonData from "./index";
import { ChangeEvent, ErrorEvent } from "./events";
interface JsonWatcherEvents {
    change: (evt: ChangeEvent) => void;
    error: (evt: ErrorEvent) => void;
    add: (evt: ChangeEvent) => void;
    update: (evt: ChangeEvent) => void;
    remove: (evt: ChangeEvent) => void;
    clear: (evt: ChangeEvent) => void;
}
export default class JsonWatcher extends EventEmitter {
    private db;
    private lastSnapshot;
    constructor(db: JsonData);
    start(): void;
    on<K extends keyof JsonWatcherEvents>(event: K, listener: JsonWatcherEvents[K]): this;
    once<K extends keyof JsonWatcherEvents>(event: K, listener: JsonWatcherEvents[K]): this;
}
export {};
