import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../interfaces/admin-category.interface';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {
  private url:string;
  constructor(private http: HttpClient,private firestore: AngularFirestore) {
    this.url = 'http://localhost:3000/categories' ;
   }

  getJsonCategories():Observable<Array<ICategory>>{
    return this.http.get<Array<ICategory>>(this.url)
  }
  addJsonCategories(category:ICategory):Observable<ICategory>{
    return this.http.post<ICategory>(this.url,category);
  }
  deleteJsonCategory(category:ICategory):Observable<ICategory>{
    return this.http.delete<ICategory>(`${this.url}/${category.id}`)
  }
  updateJsonCategory(category:ICategory):Observable<ICategory>{
    return this.http.put<ICategory>(`${this.url}/${category.id}`,category)
  }

// -------------------------------------------FIREBASE
  getFireBaseCategories(){
    return this.firestore.collection('categories').snapshotChanges();
  }
  addFirebaseCategory(category: any): Promise<DocumentReference>  {
    return this.firestore.collection('categories').add({...category});
  }

  deleteFirebaseCategory(id: string): Promise<void> {
    return this.firestore.collection('categories').doc(id).delete();
  }

  updateFirebaseCategory(category: any, id: string): Promise<void> {
    return this.firestore.collection('categories').doc(id).update({...category});
  }
}
