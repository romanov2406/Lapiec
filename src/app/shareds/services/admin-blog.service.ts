import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminBlogService {
  constructor(private firestore: AngularFirestore) {}
  getFireBaseBlog(){
    return this.firestore.collection('blogs').snapshotChanges();
  }
  addFirebaseBlog(blog: any): Promise<DocumentReference>  {
    return this.firestore.collection('blogs').add({...blog});
  }

  deleteFirebaseBlog(id: string): Promise<void> {
    return this.firestore.collection('blogs').doc(id).delete();
  }

  updateFirebaseBlog(blog: any, id: string): Promise<void> {
    return this.firestore.collection('blogs').doc(id).update({...blog});
  }
}
