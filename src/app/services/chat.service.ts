import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chat } from '../models/chat.model';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Chat>;
  items: Observable<Chat[]>;
  chats: Chat[]=[]
  constructor(private afs: AngularFirestore) {
  }
  getChat(){
    this.itemsCollection = this.afs.collection<Chat>('conversaciones', ref=> ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(map((mensajes:Chat[])=> {
      this.chats = []
      for (let mensaje of mensajes){
        this.chats.unshift(mensaje)
      }
      return this.chats

    }));
  }
  addChat(item: Chat) {
    return this.itemsCollection.add(item);
  }
}
