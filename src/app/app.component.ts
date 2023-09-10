import { Component, OnInit, Type } from '@angular/core';
import { ITableColumnsProps } from './component/table/table.interface';
import { MatTableDataSource } from '@angular/material/table';
import { CustomCell } from './component/table/cell/custom-cell.component';
import { ButtonComponent } from './component/button/button.component';
import { ParagraphComponent } from './component/paragraph/paragraph.component';

interface User {
  id: number;
  name: string;
  age: number;
  phoneNumber: number;
  action: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-app';
  dataSource!: User[];
  displayColumns: ITableColumnsProps<User>[] = [
    {
      columnDef: 'name',
      header: 'Họ và tên',
      cellType: 'string',
      isSort: true,
      cell: (element: User) => {
        return element.name;
      },
    },
    {
      columnDef: 'age',
      header: 'tuổi',
      cellType: 'string',
      cell: (element: User) => {
        return element.age;
      },
    },
    {
      columnDef: 'phoneNumber',
      header: 'Số điện thoại',
      cellType: 'date',
      isSort: true,
      cell: (element: User) => {
        return element.phoneNumber;
      },
    },
    {
      columnDef: 'action',
      header: 'Hành động',
      cellType: 'customize',
      isSort: true,
      cell: (element: User) => {
        return element.action;
      },
    },
  ];

  ngOnInit(): void {}
  isCheck = false;
  handleSetNull(boolean: boolean) {
    if (this.isCheck) {
      this.isCheck = false;
      this.dataSource = [];
    } else {
      this.isCheck = true;
      this.dataSource = [
        {
          id: 1,
          name: 'nhan',
          age: 12,
          phoneNumber: new Date(),
          action: new CustomCell(ButtonComponent, 'hihcxzcxzi'),
        },
        {
          id: 2,
          name: 'nha1n',
          age: 15,
          phoneNumber: 1234,
          action: new CustomCell(ParagraphComponent, 'hihi'),
        },
        {
          id: 3,
          name: 'nha2n',
          age: 13,
          phoneNumber: 1234,
          action: new CustomCell(ButtonComponent, 'hihi'),
        },
      ] as User[];
      console.log('vao day', this.isCheck);
    }
  }
}
