import { IAdminBlog } from '../interfaces/adminBlog.interface';

export class AdminBlog implements IAdminBlog {
    constructor(
        public id: string,
        public title: string,
        public text: string,
        public author: string,
        public date:number,
        public image?:string,
       
       
    ) { }
}