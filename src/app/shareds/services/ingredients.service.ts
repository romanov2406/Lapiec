import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  constructor(private firestore: AngularFirestore) {}
  getFireBaseIngredients() {
    return this.firestore.collection("pizzaIngredients").snapshotChanges();
  }
  addFirebaseIngredient(ingredient: any): Promise<DocumentReference> {
    return this.firestore.collection('pizzaIngredients').add({ ...ingredient });
  }

  deleteFirebaseIngredient(id: string): Promise<void> {
    return this.firestore.collection('pizzaIngredients').doc(id).delete();
  }

  updateFirebaseIngredient(ingredient: any, id: string): Promise<void> {
    return this.firestore.collection('pizzaIngredients').doc(id).update({ ...ingredient });
  }
}
