export interface DbDetails {
    path: string | null;
    isConnected: boolean;
    DbLinesCount: number;
}
export type MathOperator = "+" | "-" | "*" | "/" | "%";
export interface JsonWatcherEvents {
    add: (evt: ChangeEvent) => void;
    update: (evt: ChangeEvent) => void;
    remove: (evt: ChangeEvent) => void;
    clear: (evt: BaseEvent) => void;
    change: (evt: ChangeEvent) => void;
    error: (evt: ErrorEvent) => void;
}
export interface BaseEvent {
    type: string;
}
export interface ErrorEvent extends BaseEvent {
    type: "error";
    message: string;
    error: any;
}
export interface ChangeEvent extends BaseEvent {
    type: "change";
    data: any;
    diff?: {
        added?: string[];
        updated?: string[];
        removed?: string[];
    };
}
//# sourceMappingURL=jsonDb.d.ts.map