import { Component, OnInit, TemplateRef } from '@angular/core';
import { IAdminBlog } from 'src/app/shareds/interfaces/adminBlog.interface';
import { AdminBlogService } from 'src/app/shareds/services/admin-blog.service';
import { AdminBlog } from 'src/app/shareds/models/adminBlog.class.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  arrayOfBlogs: Array<any> = [];
  titleBlog: string;
  textBlog: string;
  authorBlog: string;
  blogId: string;
  currentDate: number = Date.now();
  blogImage: string;

  modalRef: BsModalRef;
  blogToDelete:IAdminBlog;
  modalRefConfirm: BsModalRef;

  uploadProgress: Observable<number>;
 
  editStatus: boolean;
  

  constructor(private adminBlogService: AdminBlogService, private modalService: BsModalService, private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getCloudBlogs();
  }

  private getCloudBlogs() {
    this.adminBlogService.getFireBaseBlog().subscribe(actions => {
      this.arrayOfBlogs = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, { id: id }, data);
      });
    });
  }

  public AddBlog(): void {
    const blog: IAdminBlog = new AdminBlog(null,this.titleBlog, this.textBlog, this.authorBlog,this.currentDate,  this.blogImage);
    delete blog.id;
    this.adminBlogService.addFirebaseBlog(blog)
      .then(() => console.log('add blog success'))
      .catch(err => console.log('add blog error', err));
    this.resetForm();
  }

  public editBlog(template: TemplateRef<any>, blog: IAdminBlog) {
    this.modalRef = this.modalService.show(template);
    this.blogId = blog.id;
    this.titleBlog = blog.title;
    this.textBlog = blog.text;
    this.authorBlog = blog.author;
    this.blogImage = blog.image;
    this.editStatus = true;
  }

  public deleteBlogConfirm(confirm: TemplateRef<any>, blog: IAdminBlog) {
    this.modalRefConfirm = this.modalService.show(confirm, { class: 'modal-sm' });
    this.blogToDelete = blog;
  }

  public deleteBlog(): void {
    this.adminBlogService.deleteFirebaseBlog(this.blogToDelete.id)
      .then(() => console.log('delete blog success'))
      .catch(err => console.log('delete blog error', err));
    this.modalRefConfirm.hide();
  }

  public saveEditBlog(): void {
    const editedBlog: IAdminBlog = new AdminBlog(this.blogId,this.titleBlog, this.textBlog, this.authorBlog,this.currentDate,  this.blogImage);
    delete editedBlog.id;
    this.adminBlogService.updateFirebaseBlog(editedBlog, this.blogId)
      .then(() => console.log('update product success'))
      .catch(err => console.log('update product error', err));
    this.blogId = '';
    this.resetForm();
  }


  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then(e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(url => {
        this.blogImage = url;
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
    this.titleBlog = '';
    this.textBlog = '';
    this.authorBlog = '';
  }
}
