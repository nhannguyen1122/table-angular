import { Type } from '@angular/core';

export class CustomCell<T> {
  constructor(public component: Type<any>, public data: T) {}
}
