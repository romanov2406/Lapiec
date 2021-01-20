import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  constructor(private firestore: AngularFirestore) {}

  getFireBaseDiscounts(){
    return this.firestore.collection('discounts').snapshotChanges();
  }
  addFirebaseDiscount(discount: any): Promise<DocumentReference>  {
    return this.firestore.collection('discounts').add({...discount});
  }

  deleteFirebaseDiscount(id: string): Promise<void> {
    return this.firestore.collection('discounts').doc(id).delete();
  }

  updateFirebaseDiscount(discount: any, id: string): Promise<void> {
    return this.firestore.collection('discounts').doc(id).update({...discount});
  }

  getFireBaseDiscountDetails(id:string){
    return this.firestore.collection('discounts').doc(id).get().toPromise();
  }
}
