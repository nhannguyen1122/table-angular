import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() data: string = '';

  constructor(private appService: AppService) {}
  handleClick() {
    this.appService.handleClick('nhandz');
  }
}
