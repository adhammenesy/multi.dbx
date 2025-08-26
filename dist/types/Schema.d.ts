export type FieldType = "string" | "number" | "boolean" | "array" | "object";
export type SchemaDefinition = Record<string, FieldDefinition>;
export type Def = Record<string, SchemaField>;
export interface SchemaField {
    type: FieldType | StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor | ObjectConstructor;
    required?: boolean;
    default?: any;
    enum?: any[];
}
export interface FieldDefinition {
    type: FieldType | StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor | ObjectConstructor;
    required?: boolean;
    default?: any;
    enum?: any[];
}
export interface AdvancedSchemaOptions {
    object: SchemaDefinition;
    path: string;
}
//# sourceMappingURL=Schema.d.ts.map