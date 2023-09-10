import { Component } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
export type CellType = 'string' | 'number' | 'date' | 'customize';

export interface ITableColumnsProps<T> {
  columnDef: string;
  header: string;
  cell: (element: T) => any;
  cellType: CellType;
  isSort?: boolean;
  sortOrder?: SortDirection;
}

export interface IDataSource<T> {
  [key: string]: T;
}
