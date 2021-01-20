import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../interfaces/order.interface';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  basket: Subject<any> = new Subject<any>();
  
  constructor(private firestore: AngularFirestore) {}

  getFireBaseOrders(){
    return this.firestore.collection('orders').snapshotChanges();
  }

  addFirebaseOrder(order: any): Promise<DocumentReference>  {
    return this.firestore.collection('orders').add({...order});
  }

  deleteFirebaseOrder(id: string): Promise<void> {
    return this.firestore.collection('orders').doc(id).delete();
  }
}
