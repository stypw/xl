

export type Nullable<T> = T | null;
export type AcceptString<T> = T | string | null | undefined;
export type Call = () => void;
export type Pass<T> = (v: T) => void;

export type GetValue<T> = () => T;
export type SetValue<T> = (v: T) => void;
export type GetNumber = GetValue<number>;
export type SetNumber = SetValue<number>;
export type GetString = GetValue<string>;
export type SetString = SetValue<string>;
export type GetBoolean = GetValue<boolean>;
export type SetBoolean = SetValue<boolean>;




