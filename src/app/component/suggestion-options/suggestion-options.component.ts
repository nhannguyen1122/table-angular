import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-suggestion-options',
  templateUrl: './suggestion-options.component.html',
  styleUrls: ['./suggestion-options.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SuggestionOptionsComponent,
    },
  ],
})
export class SuggestionOptionsComponent implements ControlValueAccessor {
  isOpen: boolean = false;
  selectedOptions = {
    label: '',
    value: '',
  };
  @Input() list: { label: string; value: string }[] = [];

  onChange = (value: string) => {};

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(value: any): void {
    this.selectedOptions.value = value;
  }
  handleClick() {
    this.isOpen = !this.isOpen;
  }

  handleSetOptionValue({ label, value }: { label: string; value: string }) {
    this.selectedOptions = {
      label,
      value,
    };
    this.onChange(this.selectedOptions.value);
    this.isOpen = !this.isOpen;
  }
}
