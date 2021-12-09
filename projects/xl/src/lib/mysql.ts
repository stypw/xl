

export type Optional<T> = {
    [K in keyof T]?: T[K];
};
export type WhereIn<T> = {
    "$in"?: T[];
};
export type WhereNin<T> = {
    "$nin"?: T[];
};
export type WhereGt<T> = {
    "$gt"?: T;
};
export type WhereGte<T> = {
    "$gte"?: T;
};
export type WhereLt<T> = {
    "$lt"?: T;
};
export type WhereLte<T> = {
    "$lte"?: T;
};
export type WhereNe<T> = {
    "$ne"?: T;
};
export type WhereLike = {
    "$like"?: string;
};
export type WhereJson = {
    "$json"?: string;
};
export type WhereNull = {
    "$null"?: true;
};
export type WhereNotNull = {
    "$notnull"?: true;
};

export type WherePath = {
    [key: string]: any;
};

export type WhereValue<T> = (WhereIn<T> & WhereNin<T> & WhereGt<T> & WhereGte<T> & WhereLt<T> & WhereLte<T> & WhereNe<T> & WhereLike & WhereJson & WhereNull & WhereNotNull) | T;

export type WhereAnd<T> = {
    [K in keyof T]?: WhereValue<T[K]>;
};

export type WhereOr<T> = {
    "$or"?: WhereAnd<T>[];
};

export type Where<T> = WhereAnd<T> & WhereOr<T>;

export type OrderBy = "asc" | "desc";
export type Order<T> = {
    [K in keyof T]?: OrderBy;
};
export type Group<T> = {
    [idx: number]: keyof T;
};

export type FieldAs = 1 | -1;
export type Field<T> = {
    [K in keyof T]?: FieldAs;
};

export type ConutOption<T> = Where<T>;
export type ListOption<T> = {
    where?: Where<T>;
    sort?: Order<T> | string[];
    field?: Field<T> | string[];
};
export type GroupOption<T> = {
    where?: Where<T>;
    group: Group<T>;
};
export type SearchOption<T> = ListOption<T> & {
    page?: number;
    size?: number;
};
export type CreateOption<T> = Optional<T>;
export type UpdateOption<T> = {
    where: Where<T>;
    set: Optional<T>;
};
export type RemoveOption<T> = Where<T>;