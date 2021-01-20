import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shareds/services/auth.service';
import { UserService } from '../shareds/services/user.service';
import { IUser } from '../shareds/interfaces/user.interface';
import { User } from '../shareds/models/user.class.model';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  userInfo: any;

  userEmail: string = this.user.username;
  userName: string;
  userPhone: string;
  userCity: string;
  userStreet: string;
  userHouse: string;

  uploadProgress: Observable<number>;
  modalRef: BsModalRef;
  userImage: string;
  lastOrder: string = 'Поки що немає...';

  name: string;
  phone: string;
  city: string;
  street: string;
  house: string;
  editStatus: boolean;
  noFullInfo:boolean = true;
  constructor(private modalService: BsModalService, private afStorage: AngularFireStorage, private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.userService.getOneUserInfo(this.userEmail).subscribe(
      data => {
        this.userInfo = data;
        this.userInfo = this.userInfo[0];
        this.name = this.userInfo.name;
        this.phone = this.userInfo.phone;
        this.city = this.userInfo.city;
        this.street = this.userInfo.street;
        this.house = this.userInfo.house;
        this.userImage = this.userInfo.image;
        if(this.userInfo.ordersHistory[0]!= undefined){
          this.lastOrder = this.userInfo.ordersHistory[0].nameUA;
        }
        if(this.name != ''){
          this.noFullInfo = false;
        }
      });
  }

  AddNewInfo(): void {
    const addUserInfo: IUser = new User(
      this.userName,
      this.userPhone,
      this.userCity,
      this.userStreet,
      this.userHouse,
      this.userImage
    )
    this.userService.updateUserInfo(addUserInfo);
    this.resetForm();
  }
  editInfo(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
    this.userName = this.userInfo.name;
    this.userPhone = this.userInfo.phone;
    this.userCity = this.userInfo.city;
    this.userStreet = this.userInfo.street;
    this.userHouse = this.userInfo.house;
    this.userImage = this.userInfo.image
    this.editStatus = true;
  }
  saveEditInfo() {
    const editedUserInfo: IUser = new User(
      this.userName,
      this.userPhone,
      this.userCity,
      this.userStreet,
      this.userHouse,
      this.userImage
    )
    this.userService.updateUserInfo(editedUserInfo);
    this.resetForm();
    this.editStatus = false;
  }

  logOut(): void {
    this.auth.logOut();
  }
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then(e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(url => {
        this.userImage = url;
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
    this.userName = '';
    this.userPhone = '';
    this.userCity = '';
    this.userStreet = '';
    this.userHouse = null;
  }

}
