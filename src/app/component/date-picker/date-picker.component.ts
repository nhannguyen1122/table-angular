import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DateTime } from 'luxon';
import * as moment from 'moment';
import { ReplaySubject } from 'rxjs';

const NOOPTANCESSOR = {
  registerOnChange(fn: any): void {},

  registerOnTouched(fn: any): void {},

  setDisabledState(isDisabled: boolean): void {},

  writeValue(obj: any): void {},
};
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {
  value = '';
  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  @Input() formControlName!: any;

  onChanges = (value: string) => {};
  registerTouchedChanges = (value?: string) => {};

  registerOnChange(fn: any): void {
    this.onChanges = fn;
  }

  registerOnTouched(fn: any): void {
    this.registerTouchedChanges = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(obj: any): void {
    this.value = obj;
  }
  // subject = new ReplaySubject(3); // buffer 3 values for new subscribers

  // value = '';
  // @ViewChild('timeControlTmpl', { static: true })
  // timeControlTmpl!: ElementRef<HTMLInputElement>;

  // timepickerTime = '';
  // handleChangeTime(time: any) {
  //   console.log('time', time);
  //   this.timepickerTime = time;
  // }

  // changeValue(event: any) {
  //   // this.value = DateTime.fromObject({
  //   //   hour: event.slice(-1),
  //   // }).toFormat('hh');
  //   this.value = moment(+event, 'HH').toString();
  //   console.log(event);
  //   this.value = moment(event).isValid()
  //     ? moment(event).format('HH')
  //     : 'sai cmnr';
  // }
  // a() {
  //   this.subject.subscribe({
  //     next: (v) => console.log(`observerA: ${v}`),
  //   });

  //   this.subject.next(1);
  //   this.subject.next(2);
  //   this.subject.next(3);
  //   this.subject.next(4);

  //   // this.subject.subscribe({
  //   //   next: (v) => console.log(`observerB: ${v}`),
  //   // });

  //   this.subject.next(5);
  //   this.subject.subscribe({
  //     next: (v) => console.log(`observerB: ${v}`),
  //   });
  // }
  ngOnInit(): void {
    // this.a();

    console.log('formGroup', this.ngControl);
  }

  handleChange(event: any) {
    console.log('event', this.formControlName);
    console.log('formGroup', this.ngControl);
    this.onChanges(this.value);
    this.ngControl.control?.markAsPristine();
    this.ngControl.control?.markAsTouched();
  }
}
