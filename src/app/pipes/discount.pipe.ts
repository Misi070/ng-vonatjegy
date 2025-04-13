import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {
  transform(value: number, discount: number): number {
    if (!value || discount < 0 || discount > 100) return value;
    return parseInt((value * (1 - discount / 100)).toFixed(0));
  }
}
