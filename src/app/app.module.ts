import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './component/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CellTableComponent } from './component/table/cell/cell.component';
import { ButtonComponent } from './component/button/button.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ParagraphComponent } from './component/paragraph/paragraph.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CellTableComponent,
    ButtonComponent,
    ParagraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
