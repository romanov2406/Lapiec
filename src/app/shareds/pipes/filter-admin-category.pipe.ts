import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAdminCategory'
})
export class FilterAdminCategoryPipe implements PipeTransform {

  transform(adminProducts: Array<any>, filterProduct: string): unknown {
    if (!filterProduct) {
      return adminProducts;
    }
    if (!adminProducts) {
      return [];
    }
    return adminProducts.filter((product)=>{
      return product.nameUA.toLowerCase().indexOf(filterProduct.toLowerCase()) !== -1
      || product.nameEN.toLowerCase().indexOf(filterProduct.toLowerCase()) !== -1 
    })
  }

}
