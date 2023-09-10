import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  ApplicationRef,
  OnInit,
  OnDestroy,
  TemplateRef,
  ComponentRef,
  ElementRef,
} from '@angular/core';
import { CellType, IDataSource } from '../table.interface';
import * as moment from 'moment';
import { CustomCell } from './custom-cell.component';
@Component({
  selector: 'app-table-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellTableComponent<T> implements OnInit, OnDestroy {
  cellData = '';
  @Input() data!: IDataSource<any>;
  @Input() cellType: CellType = 'string';

  /**
   *
   * @Aim the the first View Only
   */
  @ViewChild('cellTmpl', { static: true, read: ViewContainerRef })
  cellTmpl!: ViewContainerRef;
  @ViewChild('normalData', { static: true })
  normalData!: TemplateRef<ElementRef>;

  ngOnInit(): void {
    this.renderCell();
  }

  ngOnDestroy(): void {}

  renderCell() {
    const typeConfig = {
      string: () => this.renderNormalCell(this.data),
      date: () =>
        this.renderNormalCell(
          moment(this.data).isValid()
            ? moment(this.data).format('DD/MM/YY hh:mm:ss')
            : this.data
        ),
      number: () => this.renderNormalCell(Number(this.data)),
      customize: () => this.setCustomizeComponent(),
    };
    return typeConfig[this.cellType]();
  }

  private setCustomizeComponent() {
    const item = this.data as CustomCell<T>;
    this.cellTmpl.clear();
    const componentRef: ComponentRef<CustomCell<T>> =
      this.cellTmpl.createComponent(item.component);
    componentRef.instance.data = item.data;
  }

  private renderNormalCell<T>(data: T) {
    this.cellData = `${data}`;
    this.cellTmpl.createEmbeddedView(this.normalData);
  }
}
