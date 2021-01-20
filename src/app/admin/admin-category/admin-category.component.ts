import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from 'src/app/shareds/interfaces/admin-category.interface';
import { AdminCategoryService } from 'src/app/shareds/services/admin-category.service';
import { Category } from 'src/app/shareds/models/admin-category.class.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  adminCategories: Array<ICategory> = [];
  categoryId: number;
  // --------------------------------------------
  cloudCategories: Array<any> = [];
  cloudCategoryID:string;
  categoryNameUA: string;
  categoryNameEN: string;

  editStatus: boolean;

  modalRef: BsModalRef;
  categoryToDelete: ICategory;
  modalRefConfirm: BsModalRef;

  constructor(private adminCategoryService: AdminCategoryService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCloudCategories();
  }
  
  private getCloudCategories() {
    this.adminCategoryService.getFireBaseCategories().subscribe(actions => {
      this.cloudCategories = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, { id: id }, data);
      });
    });
  }

  addCloudProduct(): void {
    const newCategory: ICategory = new Category(null, this.categoryNameUA, this.categoryNameEN);
    delete newCategory.id;
    this.adminCategoryService.addFirebaseCategory(newCategory)
      .then(() => console.log('add product success'))
      .catch(err => console.log('add product error', err));
    this.resetForm();
    this.modalRef.hide();
  }

  public editCategory(template: TemplateRef<any>, category: ICategory) {
    this.modalRef = this.modalService.show(template);
    this.categoryNameUA = category.nameUA;
    this.categoryNameEN = category.nameEN;
    this.editStatus = true;
  }

  deleteCategoryConfirm(confirm: TemplateRef<any>, category: ICategory) {
    this.modalRefConfirm = this.modalService.show(confirm, { class: 'modal-sm' });
    this.categoryToDelete = category;
  }

  deleteCategory(): void {
    this.adminCategoryService.deleteFirebaseCategory(this.categoryToDelete.id)
      .then(() => console.log('delete product success'))
      .catch(err => console.log('delete product error', err));
      
  }
  public saveEditCategory(): void {
      const editCategory: ICategory = new Category(null, this.categoryNameUA, this.categoryNameEN);
      delete editCategory.id;
      this.adminCategoryService.updateFirebaseCategory(editCategory, this.cloudCategoryID)
        .then(() => console.log('update product success'))
        .catch(err => console.log('update product error', err));
      this.cloudCategoryID = '';
      this.resetForm();
    }
  // ---------------------------------------------------



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.editStatus = false;
    this.resetForm();
  }
  decline(): void {
    this.modalRefConfirm.hide();
  }
  private resetForm(): void {
    this.categoryId = null;
    this.categoryNameUA = '';
    this.categoryNameEN = '';
  }
}
