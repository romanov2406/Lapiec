import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/shareds/services/discount.service';
import { ActivatedRoute } from '@angular/router';
import { IDiscount } from 'src/app/shareds/interfaces/discount.interface';
import { trigger, style, animate, transition, } from '@angular/animations';
import 'firebase/firestore';
@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss'],
  animations: [
    trigger('appear', [
      transition(':enter', [
        style({
          transform: 'translateY(-100%)'
        }),
        animate(
          '700ms ease-in', style({
            transform: 'translateY(0%)'
          }))
      ])
    ])
  ]
})
export class DiscountDetailsComponent implements OnInit {

  view: any;

  constructor(private discountService: DiscountService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOneDiscount();
  }
  getOneDiscount() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.discountService.getFireBaseDiscountDetails(id)
      .then(serviceResponse => {
        this.view = serviceResponse.data();
      })
  }
}
