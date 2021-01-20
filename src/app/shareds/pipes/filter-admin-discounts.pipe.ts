import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAdminDiscounts'
})
export class FilterAdminDiscountsPipe implements PipeTransform {

  transform(arrayDiscounts: Array<any>, filterDiscount: string): unknown {
    if (!filterDiscount) {
      return arrayDiscounts;
    }
    if (!arrayDiscounts) {
      return [];
    }
    return arrayDiscounts.filter((discount)=>{
      return discount.title.toLowerCase().indexOf(filterDiscount.toLowerCase()) !== -1
      || discount.text.toLowerCase().indexOf(filterDiscount.toLowerCase()) !== -1 
    })
  }

}
