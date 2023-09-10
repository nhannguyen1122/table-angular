import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IDataSource, ITableColumnsProps } from './table.interface';
import { Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  protected displayedColumns: string[] = [];
  protected originDataSource = new MatTableDataSource<IDataSource<any>>([]);
  protected originTableColumns!: ITableColumnsProps<any>[];

  selection = new SelectionModel<IDataSource<any>>(true, []);

  @Input() haveCheckbox: boolean = true;
  @Input() tableColumns!: ITableColumnsProps<any>[];
  @Input() dataSource: IDataSource<any>[] = [];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.tableColumns) {
      this.originDataSource = new MatTableDataSource(this.dataSource);
      this.originTableColumns = this.tableColumns;
      this.displayedColumns = this.setDisplayColumns();
    }
  }

  sortData(sort: any) {
    console.log('sort', sort);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.originDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.originDataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IDataSource<any>): string {
    console.log('row', row);

    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row['id'] + 1
    }`;
  }

  private setDisplayColumns(): string[] {
    let displayColumnsArr = this.originTableColumns.map(
      (item) => item.columnDef
    );
    if (this.haveCheckbox) {
      displayColumnsArr = ['select', ...displayColumnsArr];
    } else {
      displayColumnsArr = [...displayColumnsArr];
    }
    return displayColumnsArr;
  }
}
