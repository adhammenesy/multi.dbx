export interface ErrorEvent {
    type: "error";
    message: string;
    error?: unknown;
}
