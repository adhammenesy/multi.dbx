import { EventEmitter } from "node:events";
import JsonData from "./index";
export default class JsonWatcher extends EventEmitter {
    private db;
    private lastSnapshot;
    constructor(db: JsonData);
    start(): void;
}
