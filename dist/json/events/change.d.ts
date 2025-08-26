export interface ChangeEvent<T = any> {
    type: "change";
    data: T;
    diff?: {
        added?: string[];
        updated?: string[];
        removed?: string[];
    };
}
//# sourceMappingURL=change.d.ts.map