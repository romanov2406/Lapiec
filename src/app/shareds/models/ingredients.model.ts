import { IIngredients } from '../interfaces/ingredients.interface';

export class Ingredients implements IIngredients{
    constructor(
        public id:string,
        public nameUA:string,
        public weight:string,
        public price:number,
        public image?:string
    ){}
}