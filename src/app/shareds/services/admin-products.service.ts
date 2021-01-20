import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {
  constructor(private firestore: AngularFirestore) {}
  getFireBaseProducts(){
    return this.firestore.collection('products').snapshotChanges();
  }

  addFirebaseProducts(product: any): Promise<DocumentReference>  {
    return this.firestore.collection('products').add({...product});
  }

  deleteFirebaseProducts(id: string): Promise<void> {
    return this.firestore.collection('products').doc(id).delete();
  }

  updateFirebaseProducts(product: any, id: string): Promise<void> {
    return this.firestore.collection('products').doc(id).update({...product});
  }

  getFireBaseProductDetails(id:string){
    return this.firestore.collection('products').doc(id).get().toPromise();
  }
  getFireBaseCategoryProducts(categoryName:string){
    return this.firestore.collection<any>('products', ref => ref.where('category.nameEN', '==', categoryName)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
