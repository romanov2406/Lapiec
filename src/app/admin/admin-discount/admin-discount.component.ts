import { Component, OnInit, TemplateRef } from '@angular/core';
import { DiscountService } from 'src/app/shareds/services/discount.service';
import { IDiscount } from 'src/app/shareds/interfaces/discount.interface';
import { Discount } from 'src/app/shareds/models/discount.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss'],
})
export class AdminDiscountComponent implements OnInit {

  arrayDiscounts: Array<any> = [];
  title: string;
  text: string;
  filterDiscount: string;
  discountId: string;
  editStatus: boolean;

  uploadProgress: Observable<number>;
  discountImage: string;

  modalRef: BsModalRef;
  discountToDelete: IDiscount;
  modalRefConfirm: BsModalRef;

  constructor(private discountService: DiscountService, private modalService: BsModalService,  private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getDiscount();
  }

  private getDiscount(): void {
   this.discountService.getFireBaseDiscounts().subscribe(actions => {
      this.arrayDiscounts = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, { id: id }, data);
      });
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then(e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(url => {
        this.discountImage = url;
      });
    });
  }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public AddDiscount(): void {
    const discount: IDiscount = new Discount(null,this.title, this.text, this.discountImage);
    delete discount.id;
    this.discountService.addFirebaseDiscount(discount)
      .then(() => console.log('add blog success'))
      .catch(err => console.log('add blog error', err));
    this.resetForm();
  }

  deleteDiscountConfirm(confirm: TemplateRef<any>, discount: IDiscount) {
    this.modalRefConfirm = this.modalService.show(confirm, { class: 'modal-sm' });
    this.discountToDelete = discount;
  }

  public deleteDiscount(): void {
    this.discountService.deleteFirebaseDiscount(this.discountToDelete.id)
      .then(() => console.log('delete blog success'))
      .catch(err => console.log('delete blog error', err));
    this.modalRefConfirm.hide();
  }
  decline(): void {
    this.modalRefConfirm.hide();
  }

  public editDiscount(template: TemplateRef<any>, discount: IDiscount) {
    this.modalRef = this.modalService.show(template);
    this.title = discount.title;
    this.text = discount.text;
    this.discountId = discount.id;
    this.discountImage = discount.image;
    this.editStatus = true;
  }

  public saveEditDiscount(): void {
   const editedDiscount: IDiscount = new Discount(this.discountId ,this.title, this.text, this.discountImage);
    delete editedDiscount.id;
    this.discountService.updateFirebaseDiscount(editedDiscount, this.discountId)
      .then(() => console.log('update product success'))
      .catch(err => console.log('update product error', err));
    this.discountId = '';
    this.resetForm();
  }
  private resetForm(): void {
    this.title = '';
    this.text = '';
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.editStatus = false;
    this.resetForm();
  }
}
