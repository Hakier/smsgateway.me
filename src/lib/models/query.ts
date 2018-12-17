export interface IFilter<T> {
  field: keyof T | 'status';
  operator: '=';
  value: string;
}

export interface IOrderBy<T> {
  field: keyof T;
  direction: 'desc' | 'asc';
}

export interface IQuery<T> {
  filters?: [Array<IFilter<T>>];
  order_by?: IOrderBy<T>;
  limit?: number;
  offset?: number;
}
