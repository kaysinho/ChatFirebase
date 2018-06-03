import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chat:Chat = {
    mensaje:'',
    nombre: this._session.usuario.nombre,
    fecha: new Date().getTime(),
    uID: this._session.usuario.uID
  }
  elemento:any
  constructor(private _chatService:ChatService,
              private _session:LoginService
    ) { 
    this._chatService.getChat().subscribe( data =>{

      //Mueve el Scroll hacia abajo
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight  
      }, 500);
      
    })
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes')
  }

  enviar(){
    if (this.chat.mensaje.length>0){
      this._chatService.addChat(this.chat).then(()=>{
        
      })
      this.chat.mensaje = ''
    }
    
  }

}
