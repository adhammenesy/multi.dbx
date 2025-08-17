export interface ChangeEvent<T = any> {
    type: "change";
    data: T;
}
