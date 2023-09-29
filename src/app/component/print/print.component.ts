import { Component } from '@angular/core';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss'],
})
export class PrintComponent {
  print() {
    const printContent = document.getElementById('print-container') as any;
    const WindowPrt = window.open(
      '',
      '',
      'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0'
    ) as any;
    WindowPrt.document.write(printContent.innerHTML as any) as any;
    WindowPrt.document.close();
    WindowPrt.focus();

    WindowPrt.print();
    WindowPrt.close();
  }
}
