import { DateTime } from 'luxon';
import { Component, Input } from '@angular/core';
import {
  TimeFormat,
  TimeLimit,
  TimeSetting,
  TimeUnit,
} from '../../time-constants';

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
})
export class TimeInputComponent {
  // time = '';
  // timeUnit = TimeUnit.MINUTE;

  @Input() timeUnit: TimeUnit = TimeUnit.HOUR;
  @Input() time: string = '';
  onKeyDown(event: KeyboardEvent) {
    if (!isNaN(Number(event.key)) || event.key === 'Backspace') {
      event.stopPropagation();
    } else {
      event.preventDefault();
    }
  }

  handleChangeTime(timeValue: string) {
    console.log('timeValue', timeValue.slice(-1));
    if (!timeValue) {
      this.time = timeValue;
    } else if (Number(timeValue) > TimeLimit.MAX) {
      const parseTimeConfig = {
        [TimeUnit.MINUTE]: () => this.parseTime(timeValue, TimeFormat.MM),
        [TimeUnit.HOUR]: () =>
          this.parseTime(
            timeValue,
            Number(timeValue) === 0 ? TimeFormat.HH : TimeFormat.H
          ),
      };
      try {
        parseTimeConfig[this.timeUnit]();
      } catch (er) {
        this.time = '';
      }
    } else {
      const formatTimeConfig = {
        [TimeUnit.MINUTE]: () => this.formatTime(timeValue, TimeFormat.M),
        [TimeUnit.HOUR]: () => this.parseTime(timeValue, TimeFormat.H),
      };
      try {
        formatTimeConfig[this.timeUnit]();
      } catch (er) {
        this.time = '';
      }
    }
  }

  private parseTime(timeValue: string, timeFormat: TimeFormat = TimeFormat.MM) {
    try {
      this.time = `${DateTime.fromObject({
        [this.timeUnit]: +timeValue.slice(-1),
      })
        .setLocale(TimeSetting.locale)
        .toFormat(timeFormat)}`;
    } catch (er) {
      this.time = '';
    }
  }

  private formatTime(timeValue: string, timeFormat: TimeFormat = TimeFormat.M) {
    try {
      this.time = `${
        DateTime.fromFormat(String(timeValue), timeFormat, {
          numberingSystem: TimeSetting.numberingSystem,
          locale: TimeSetting.locale,
        })[this.timeUnit]
      }`;
    } catch (er) {
      this.time = '';
    }
  }
}
