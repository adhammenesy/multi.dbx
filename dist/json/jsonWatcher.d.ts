import { EventEmitter } from "node:events";
import { JsonWatcherEvents } from "../../types/jsonDb";
export default class JsonWatcher extends EventEmitter {
    private db;
    private lastSnapshot;
    private readyPromise;
    constructor(db: any);
    waitReady(): Promise<void>;
    private initSnapshot;
    private fetchCurrent;
    start(): void;
    on<K extends keyof JsonWatcherEvents>(event: K | any, listener: JsonWatcherEvents[K] | any): this;
    once<K extends keyof JsonWatcherEvents>(event: K | any, listener: JsonWatcherEvents[K] | any): this;
}
//# sourceMappingURL=jsonWatcher.d.ts.map