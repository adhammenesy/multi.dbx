export type FieldType = "string" | "number" | "boolean" | "array" | "object";
export type DatabaseTypes = "json" | "jsonx" | undefined;
export type SchemaDefinition<T> = {
  [K in keyof T]?: any;
} & {
  _dbid?: string;
};
export type Def = Record<string, SchemaField>;
export interface SchemaField {
  type:
  | FieldType
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | ArrayConstructor
  | ObjectConstructor;
  required?: boolean;
  default?: any;
  enum?: any[];
}

export interface FieldDefinition {
  type:
  | FieldType
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | ArrayConstructor
  | ObjectConstructor;
  required?: boolean;
  default?: any;
  enum?: any[];
}

export interface AdvancedSchemaOptions {
  object: SchemaDefinition;
  path: string;
}
