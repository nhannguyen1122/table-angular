import { Component, OnInit, Type, ViewChild } from '@angular/core';
import {
  IPagination,
  ISort,
  ITableColumnsProps,
} from './component/table/table.interface';
import { MatTableDataSource } from '@angular/material/table';
import { CustomCell } from './component/table/cell/custom-cell.component';
import { ButtonComponent } from './component/button/button.component';
import { ParagraphComponent } from './component/paragraph/paragraph.component';
import { AppService, GithubIssue } from './service/app.service';
import { BehaviorSubject, map, merge, switchMap, take } from 'rxjs';
import { of } from 'rxjs';
import { SortDirection } from '@angular/material/sort';
import { PrintComponent } from './component/print/print.component';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  @ViewChild('printer', { static: true }) printer!: PrintComponent;

  constructor(private appService: AppService, private fb: FormBuilder) {}
  title = 'my-app';
  defaultSortCol = 'created_at';
  isLoading = new BehaviorSubject<boolean>(false);
  dataSource!: GithubIssue[];
  tablePagination: IPagination = {
    pageIndex: 0,
    pageSize: 5,
    total: 0,
    pageSizeOptions: [4, 5, 6],
    showFirstLastButtons: true,
  };
  displayColumns: ITableColumnsProps<GithubIssue>[] = [
    {
      columnDef: 'created',
      header: 'Ngày tạo',
      cellType: 'date',
      isSort: true,
      cell: (element: GithubIssue) => {
        return element.created_at;
      },
    },
    {
      columnDef: 'title',
      header: 'Tên issue',
      cellType: 'string',
      cell: (element: GithubIssue) => {
        return element.title;
      },
    },
    {
      columnDef: 'state',
      header: 'Trạng thái',
      cellType: 'string',
      isSort: true,
      cell: (element: GithubIssue) => {
        return element.state;
      },
    },
    {
      columnDef: 'updated_at',
      header: 'Ngày cập nhật',
      cellType: 'customize',
      isSort: true,
      cell: (element: GithubIssue) => {
        return element.updated_at;
      },
    },
  ];
  form!: FormGroup;
  list = [] as any;
  ngOnInit(): void {
    this.getList();
    console.log('dsa', this.printer);
    this.form = this.fb.group({
      option: 'dsadas',
    });

    this.form.valueChanges.subscribe((res) => {
      console.log('res', res);
    });

    setTimeout(() => {
      this.list = [
        {
          label: 'Lựa chọn 1',
          value: 1,
        },
        {
          label: 'Lựa chọn 2',
          value: 2,
        },
        {
          label: 'Lựa chọn 3',
          value: 3,
        },
      ];
    }, 2000);
  }

  getList(
    {
      pageIndex,
      active,
      sortDirection,
    }: {
      pageIndex: number;
      active: string;
      sortDirection: SortDirection;
    } = {
      pageIndex: this.tablePagination.pageIndex,
      active: '',
      sortDirection: 'asc',
    }
  ) {
    merge(of(pageIndex, active, sortDirection))
      .pipe(
        take(1),
        switchMap(() => {
          return this.appService
            .getRepoIssues(active, sortDirection, pageIndex)
            .pipe(
              map((res) => {
                this.isLoading.next(false);

                this.dataSource = res.items.map((i) => {
                  return {
                    ...i,
                    updated_at: new CustomCell(ButtonComponent, 'hihi'),
                  };
                });
                this.tablePagination.total = res.total_count;
              })
            );
        })
      )
      .subscribe((res) => {});
    // this.isLoading.next(true);
    // this.appService
    //   .getRepoIssues(active, sortDirection, pageIndex)
    //   .subscribe((res) => {
    //     this.isLoading.next(false);

    //     this.dataSource = res.items;
    //     this.tablePagination.total = res.total_count;
    //   });
  }
  isCheck = false;
  handleSetNull(boolean: boolean) {
    // if (this.isCheck) {
    //   this.isCheck = false;
    //   this.dataSource = [];
    // } else {
    //   this.isCheck = true;
    //   const fakeData = [
    //     {
    //       id: 1,
    //       name: 'nhan',
    //       age: 12,
    //       phoneNumber: new Date(),
    //       action: new CustomCell(ButtonComponent, 'hihcxzcxzi'),
    //     },
    //     {
    //       id: 2,
    //       name: 'nha1n',
    //       age: 15,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ParagraphComponent, 'hihi'),
    //     },
    //     {
    //       id: 3,
    //       name: 'nha2n',
    //       age: 13,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ButtonComponent, 'hihi'),
    //     },
    //     {
    //       id: 1,
    //       name: 'nhan',
    //       age: 12,
    //       phoneNumber: new Date(),
    //       action: new CustomCell(ButtonComponent, 'hihcxzcxzi'),
    //     },
    //     {
    //       id: 2,
    //       name: 'nha1n',
    //       age: 15,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ParagraphComponent, 'hihi'),
    //     },
    //     {
    //       id: 3,
    //       name: 'nha2n',
    //       age: 13,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ButtonComponent, 'hihi'),
    //     },
    //     {
    //       id: 1,
    //       name: 'nhan',
    //       age: 12,
    //       phoneNumber: new Date(),
    //       action: new CustomCell(ButtonComponent, 'hihcxzcxzi'),
    //     },
    //     {
    //       id: 2,
    //       name: 'nha1n',
    //       age: 15,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ParagraphComponent, 'hihi'),
    //     },
    //     {
    //       id: 3,
    //       name: 'nha2n',
    //       age: 13,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ButtonComponent, 'hihi'),
    //     },
    //     {
    //       id: 1,
    //       name: 'nhan',
    //       age: 12,
    //       phoneNumber: new Date(),
    //       action: new CustomCell(ButtonComponent, 'hihcxzcxzi'),
    //     },
    //     {
    //       id: 2,
    //       name: 'nha1n',
    //       age: 15,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ParagraphComponent, 'hihi'),
    //     },
    //     {
    //       id: 3,
    //       name: 'nha2n',
    //       age: 13,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ButtonComponent, 'hihi'),
    //     },
    //     {
    //       id: 1,
    //       name: 'nhan',
    //       age: 12,
    //       phoneNumber: new Date(),
    //       action: new CustomCell(ButtonComponent, 'hihcxzcxzi'),
    //     },
    //     {
    //       id: 2,
    //       name: 'nha1n',
    //       age: 15,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ParagraphComponent, 'hihi'),
    //     },
    //     {
    //       id: 3,
    //       name: 'nha2n',
    //       age: 13,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ButtonComponent, 'hihi'),
    //     },
    //     {
    //       id: 1,
    //       name: 'nhan',
    //       age: 12,
    //       phoneNumber: new Date(),
    //       action: new CustomCell(ButtonComponent, 'hihcxzcxzi'),
    //     },
    //     {
    //       id: 2,
    //       name: 'nha1n',
    //       age: 15,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ParagraphComponent, 'hihi'),
    //     },
    //     {
    //       id: 3,
    //       name: 'nha2n',
    //       age: 13,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ButtonComponent, 'hihi'),
    //     },
    //     {
    //       id: 1,
    //       name: 'nhan',
    //       age: 12,
    //       phoneNumber: new Date(),
    //       action: new CustomCell(ButtonComponent, 'hihcxzcxzi'),
    //     },
    //     {
    //       id: 2,
    //       name: 'nha1n',
    //       age: 15,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ParagraphComponent, 'hihi'),
    //     },
    //     {
    //       id: 3,
    //       name: 'nha2n',
    //       age: 13,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ButtonComponent, 'hihi'),
    //     },
    //     {
    //       id: 1,
    //       name: 'nhan',
    //       age: 12,
    //       phoneNumber: new Date(),
    //       action: new CustomCell(ButtonComponent, 'hihcxzcxzi'),
    //     },
    //     {
    //       id: 2,
    //       name: 'nha1n',
    //       age: 15,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ParagraphComponent, 'hihi'),
    //     },
    //     {
    //       id: 3,
    //       name: 'nha2n',
    //       age: 13,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ButtonComponent, 'hihi'),
    //     },
    //     {
    //       id: 1,
    //       name: 'nhan',
    //       age: 12,
    //       phoneNumber: new Date(),
    //       action: new CustomCell(ButtonComponent, 'hihcxzcxzi'),
    //     },
    //     {
    //       id: 2,
    //       name: 'nha1n',
    //       age: 15,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ParagraphComponent, 'hihi'),
    //     },
    //     {
    //       id: 3,
    //       name: 'nha2n',
    //       age: 13,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ButtonComponent, 'hihi'),
    //     },
    //     {
    //       id: 1,
    //       name: 'nhan',
    //       age: 12,
    //       phoneNumber: new Date(),
    //       action: new CustomCell(ButtonComponent, 'hihcxzcxzi'),
    //     },
    //     {
    //       id: 2,
    //       name: 'nha1n',
    //       age: 15,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ParagraphComponent, 'hihi'),
    //     },
    //     {
    //       id: 3,
    //       name: 'nha2n',
    //       age: 13,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ButtonComponent, 'hihi'),
    //     },
    //     {
    //       id: 1,
    //       name: 'nhan',
    //       age: 12,
    //       phoneNumber: new Date(),
    //       action: new CustomCell(ButtonComponent, 'hihcxzcxzi'),
    //     },
    //     {
    //       id: 2,
    //       name: 'nha1n',
    //       age: 15,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ParagraphComponent, 'hihi'),
    //     },
    //     {
    //       id: 3,
    //       name: 'nha2n',
    //       age: 13,
    //       phoneNumber: 1234,
    //       action: new CustomCell(ButtonComponent, 'hihi'),
    //     },
    //   ] as User[];
    //   this.dataSource = fakeData;
    //   this.tablePagination = {
    //     ...this.tablePagination,
    //     total: fakeData.length,
    //   };
    //   console.log('vao day', this.isCheck);
    // }
  }

  handlePagination({
    previousPageIndex,
    pageIndex,
    pageSize,
    length,
  }: {
    previousPageIndex: number;
    pageIndex: number;
    pageSize: number;
    length: number;
  }) {
    this.tablePagination.pageIndex = pageIndex;
    this.getList({
      pageIndex: pageIndex,
      active: this.defaultSortCol,
      sortDirection: 'asc',
    });
  }

  handleSort($event: ISort) {
    console.log('$event', $event);

    this.getList({
      pageIndex: this.tablePagination.pageIndex,
      active: $event.active,
      sortDirection: $event.direction,
    });
  }

  print() {
    this.printer.print();
  }
}
