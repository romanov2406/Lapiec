import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/shareds/services/discount.service';

import { trigger, style, animate, transition, state, } from '@angular/animations';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
  animations: [
    trigger('appear', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class DiscountComponent implements OnInit {
  arrayDiscounts: Array<any> = [];

  constructor(private discountService: DiscountService) { }

  ngOnInit(): void {
    this.getDiscount();
  }

  // private getDiscount(): void {
  //   this.discountService.getJsonDiscounts().subscribe(
  //     data => {
  //       this.arrayDiscounts = data
  //     },
  //     error => {
  //       console.log('Discount Service', error);
  //     }
  //   )
  // }

  private getDiscount(): void {
    this.discountService.getFireBaseDiscounts().subscribe(actions => {
       this.arrayDiscounts = actions.map(action => {
         const data = action.payload.doc.data();
         const id = action.payload.doc.id;
         return Object.assign({}, { id: id }, data);
       });
     });
   }
  
}
