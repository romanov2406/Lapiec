import { Component, OnInit } from '@angular/core';
import { AdminBlogService } from 'src/app/shareds/services/admin-blog.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  arrayOfBlogs:Array<any> = [];
  
  constructor(private adminBlogService: AdminBlogService) {}

  ngOnInit(): void {
    this.getBlog();
  }
  private getBlog() {
    this.adminBlogService.getFireBaseBlog().subscribe(actions => {
      this.arrayOfBlogs = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, { id: id }, data);
      });
    });
  }
}
