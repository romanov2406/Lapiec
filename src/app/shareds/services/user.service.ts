import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentId: string;
  constructor(private firestore: AngularFirestore) { }

  getOneUserInfo(email: string) {
    return this.firestore.collection<any>('users', ref => ref.where('username', '==', email)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        this.currentId = id;
        return { id, ...data };
      }))
    );
  }
  updateUserInfo(user: any) {
    return this.firestore.collection('users').doc(`${this.currentId}`).update({
      "name": user.name,
      "phone": user.phone,
      "city": user.city,
      "street": user.street,
      "house": user.house,
      "image": user.image
    });
  }
  updateOrdersHistory(orders: Array<any>,date:number) {
    console.log(orders);
    return this.firestore.collection('users').doc(`${this.currentId}`).update({
      "ordersHistory" : orders, lastOrder : date
    })
   
  }
}
