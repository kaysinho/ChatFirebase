import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public usuario:Usuario = {
    nombre:"",
    uID:"",
    fotoURL:''
  }
  constructor(public afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe(user=>{
      console.log(user)
      if (!user){
        return null
      }
      this.usuario.nombre = user.displayName
      this.usuario.uID = user.uid
      this.usuario.fotoURL = user.photoURL
    })
  }
  login(modo:string) {
    switch (modo){
      case 'google':
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
      break;
      case 'twitter':
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
      break;
    }
    
  }
  logout() {
    this.usuario.uID = "",
    this.usuario.nombre = ""
    this.usuario.fotoURL = ""
    this.afAuth.auth.signOut();
  }
}
