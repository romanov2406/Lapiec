import { Component, OnInit, TemplateRef } from '@angular/core';
import { IIngredients } from 'src/app/shareds/interfaces/ingredients.interface';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AngularFireStorage } from '@angular/fire/storage';
import { IngredientsService } from 'src/app/shareds/services/ingredients.service';
import { Ingredients } from 'src/app/shareds/models/ingredients.model';

@Component({
  selector: 'app-admin-ingredients',
  templateUrl: './admin-ingredients.component.html',
  styleUrls: ['./admin-ingredients.component.scss']
})
export class AdminIngredientsComponent implements OnInit {
  ingredients: Array<any> = [];

  ingredientId: string;

  ingredientNameUA: string;
  ingredientWeight: string;
  ingredientPrice: number;

  uploadProgress: Observable<number>;
  ingredientImage: string;

  modalRef: BsModalRef;
  ingredientToDelete: IIngredients;

  modalRefConfirm: BsModalRef;

  editStatus: boolean;

  constructor(private afStorage: AngularFireStorage, private modalService: BsModalService, private ingredientService: IngredientsService) { }

  ngOnInit(): void {
    this.getIngredient();
  }

  private getIngredient(): void {
     this.ingredientService.getFireBaseIngredients().subscribe(actions => {
      this.ingredients = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, { id: id }, data);
      });
    });
  }
  public addIngredient(): void {
    const newIngredient: IIngredients = new Ingredients(null,
      this.ingredientNameUA,
      this.ingredientWeight,
      this.ingredientPrice,
      this.ingredientImage);
      delete newIngredient.id;
      this.ingredientService.addFirebaseIngredient(newIngredient)
        .then(() => console.log('add ingredient success'))
        .catch(err => console.log('add ingredient error', err));
    this.resetForm();
  }

  public editIngredient(template: TemplateRef<any>, ingredient: IIngredients) {
    this.modalRef = this.modalService.show(template);
    this.ingredientId = ingredient.id;
    this.ingredientNameUA = ingredient.nameUA;
    this.ingredientWeight = ingredient.weight;
    this.ingredientPrice = ingredient.price;
    this.ingredientImage = ingredient.image;
    this.editStatus = true;
  }

  deleteIngredientConfirm(confirm: TemplateRef<any>, ingredient: IIngredients) {
    this.modalRefConfirm = this.modalService.show(confirm, { class: 'modal-sm' });
    this.ingredientToDelete = ingredient;
  }

  public deleteIngredient(): void {
    this.ingredientService.deleteFirebaseIngredient(this.ingredientToDelete.id)
    .then(() => console.log('delete blog success'))
    .catch(err => console.log('delete blog error', err));
  this.modalRefConfirm.hide();
  }

  decline(): void {
    this.modalRefConfirm.hide();
  }

  public saveEditIngredient(): void {
    const editIngredient: IIngredients = new Ingredients(this.ingredientId,
      this.ingredientNameUA,
      this.ingredientWeight,
      this.ingredientPrice,
      this.ingredientImage);
      delete editIngredient.id;
      this.ingredientService.updateFirebaseIngredient(editIngredient, this.ingredientId)
        .then(() => console.log('update product success'))
        .catch(err => console.log('update product error', err));
      this.ingredientId = '';
      this.resetForm();
    this.editStatus = false;
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then(e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(url => {
        this.ingredientImage = url;
      });
    });
  }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.editStatus = false;
    this.resetForm();
  }
  private resetForm(): void {
    this.ingredientNameUA = '';
    this.ingredientWeight = '';
    this.ingredientPrice = null;
  }
}
