import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from 'src/app/shareds/interfaces/product.interface';
import { AdminProductsService } from 'src/app/shareds/services/admin-products.service';
import { ICategory } from 'src/app/shareds/interfaces/admin-category.interface';
import { AdminCategoryService } from 'src/app/shareds/services/admin-category.service';
import { Product } from 'src/app/shareds/models/product.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import '@firebase/storage';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  cloudProducts: Array<any> = [];
  cloudCategories: Array<any> = [];
  cloudIngredients:Array<any> = []
  cloudProductID: string;
  productCategory: ICategory;
  categoryName: string;
  filterProduct: string;

  productNameUA: string;
  productNameEN: string;
  productDescription: string;
  productWeight: string;
  productPrice: number;
  uploadProgress: Observable<number>;
  productImage: string;
  modalRef: BsModalRef;
  productToDelete: IProduct;
  modalRefConfirm: BsModalRef;

  editStatus: boolean;
  constructor(private categoryService: AdminCategoryService, private adminProductService: AdminProductsService,
    private afStorage: AngularFireStorage, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCloudCategories();
    this.getCloudProducts();
  }
 
  private getCloudCategories() {
    this.categoryService.getFireBaseCategories().subscribe(actions => {
      this.cloudCategories = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, { id: id }, data);
      });
    });
  }

  setCategory(): void {
    const index = this.cloudCategories.findIndex(elem => elem.nameEN.toLocaleLowerCase() === this.categoryName.toLocaleLowerCase());
    this.productCategory = this.cloudCategories[index];
  }
 
  private getCloudProducts() {
    this.adminProductService.getFireBaseProducts().subscribe(actions => {
      this.cloudProducts = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, { id: id }, data);
      });
    
    });
  }

  addCloudProduct(): void {
    const product: IProduct = new Product(null,
      this.productCategory,
      this.productNameUA,
      this.productNameEN,
      this.productDescription,
      this.productWeight,
      this.productPrice,
      this.productImage,
      this.cloudIngredients);
    delete product.id;
    this.adminProductService.addFirebaseProducts(product)
      .then(() => console.log('add product success'))
      .catch(err => console.log('add product error', err));
    this.resetForm();
    this.modalRef.hide();
  }

  public editProduct(template: TemplateRef<any>, product: IProduct) {
    this.modalRef = this.modalService.show(template);
    this.productCategory = product.category;
    this.categoryName = product.category.nameEN;
    this.productNameUA = product.nameUA;
    this.productNameEN = product.nameEN;
    this.productDescription = product.description;
    this.productWeight = product.weight;
    this.productPrice = product.price;
    this.productImage = product.image;
    this.cloudProductID = product.id;
    this.editStatus = true;
  }

  deleteProductConfirm(confirm: TemplateRef<any>, product: any) {
    this.modalRefConfirm = this.modalService.show(confirm, { class: 'modal-sm' });
    this.productToDelete = product;
  }

  deleteProduct(): void {
    this.adminProductService.deleteFirebaseProducts(this.productToDelete.id)
      .then(() => console.log('delete product success'))
      .catch(err => console.log('delete product error', err));  
    this.modalRefConfirm.hide();
  }

  saveCloudProduct(): void {
    const product: IProduct = new Product( this.cloudProductID,
      this.productCategory,
      this.productNameUA,
      this.productNameEN,
      this.productDescription,
      this.productWeight,
      this.productPrice,
      this.productImage,
      this.cloudIngredients);
    delete product.id;
    this.adminProductService.updateFirebaseProducts(product, this.cloudProductID)
      .then(() => console.log('update product success'))
      .catch(err => console.log('update product error', err));
    this.cloudProductID = '';
    this.resetForm();
  }
 
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then(e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(url => {
        this.productImage = url;
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

  decline(): void {
    this.modalRefConfirm.hide();
  }
  private resetForm(): void {
    this.categoryName = '';
    this.productNameUA = '';
    this.productNameEN = '';
    this.productDescription = '';
    this.productWeight = '';
    this.productPrice = null;
  }
}
