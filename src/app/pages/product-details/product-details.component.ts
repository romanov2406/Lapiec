import { Component, OnInit } from '@angular/core';
import { AdminProductsService } from 'src/app/shareds/services/admin-products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shareds/interfaces/product.interface';
import { OrdersService } from 'src/app/shareds/services/orders.service';
import { IIngredients } from 'src/app/shareds/interfaces/ingredients.interface';
import { IngredientsService } from 'src/app/shareds/services/ingredients.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  view: any = null;

  ingredients: Array<any> = [];

  viewIngredients: Array<IIngredients> = [];

  ingredientsToPush: Array<IIngredients> = [];

  ingredientPrice:number = 0;

  totalIngredientPrice:number = 0;
 
  constructor(private prodService: AdminProductsService, private activatedRoute: ActivatedRoute, private orderService: OrdersService,
    private ingredientService: IngredientsService) { }

  ngOnInit(): void {
    this.getOneProduct();
    this.getIngredients();
  }
  private getOneProduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.prodService.getFireBaseProductDetails(id)
      .then(serviceResponse => {
        this.view = serviceResponse.data();
      })
  }

  private getIngredients(): void{
    this.ingredientService.getFireBaseIngredients().subscribe(actions => {
      this.ingredients = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, { id: id }, data);
      });
    });
  }

  public productCount(product: IProduct, status: boolean) {
    if (status) {
      product.count++;
    } else {
      if (product.count > 1) {
        product.count--;
      }
    }
  }

  addIngredient(ingredient: IIngredients): void {
    this.ingredientsToPush.push(ingredient);
    this.ingredientPrice += ingredient.price;
    this.totalIngredientPrice += ingredient.price;
    this.refreshInfoIng();
  }
  deleteIngredient(ingredient: IIngredients): void {
    this.ingredientPrice -= ingredient.price;
    this.totalIngredientPrice -= ingredient.price;
    let index = this.ingredientsToPush.indexOf(ingredient);
    this.ingredientsToPush.splice(index, 1);
    this.refreshInfoIng();
  }
  private refreshInfoIng(): void {
    this.viewIngredients = this.ingredientsToPush;
    this.view.ingredients = this.ingredientsToPush;
  }

  addBasket(product: IProduct): void {
    let firstPrice = product.price;
    let localProducts: Array<IProduct> = [];
    product.ingredients = this.ingredientsToPush;
    product.price += this.totalIngredientPrice;
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      localProducts = JSON.parse(localStorage.getItem('products'));
      if (localProducts.some(prod => prod.id === product.id)) {
        const index = localProducts.findIndex(prod => prod.id === product.id);
        localProducts[index].count += product.count;
      } else {
        localProducts.push(product);
      }
      localStorage.setItem('products', JSON.stringify(localProducts));
    } else {
      localProducts.push(product);
      localStorage.setItem('products', JSON.stringify(localProducts));
    }
    this.viewIngredients = [];
    product.ingredients = [];
    product.price = firstPrice;
    this.ingredientPrice = 0;
    this.totalIngredientPrice = 0;
    product.count = 1;
    this.orderService.basket.next(localProducts);
  }
}
