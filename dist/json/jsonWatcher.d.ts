import { EventEmitter } from "node:events";
import { JsonWatcherEvents } from "../types/jsonDb";
export default class JsonWatcher extends EventEmitter {
    private db;
    private lastSnapshot;
    private readyPromise;
    constructor(db: any);
    /** تنتظر snapshot الأولية */
    waitReady(): Promise<void>;
    /** تهيئة snapshot أولية */
    private initSnapshot;
    /** جلب البيانات الحالية من الـDB */
    private fetchCurrent;
    /** بدء المراقبة */
    start(): void;
    on<K extends keyof JsonWatcherEvents>(event: K, listener: JsonWatcherEvents[K]): this;
    once<K extends keyof JsonWatcherEvents>(event: K, listener: JsonWatcherEvents[K]): this;
}
//# sourceMappingURL=jsonWatcher.d.ts.map