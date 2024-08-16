import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io-client';
import { io } from '../SocketStart';

@Injectable({
  providedIn: 'root'
})
export class StartSocketService {

  socketStatus = 'OFF';
  private readonly socket: Socket = io;

  constructor() {
  }

  emitNewConnection(user_id) {
    this.socket.emit("start", { user_id });
  }

  listenConneciton() {
    return new Observable(observer => {
      this.socket.on("socket_connected", async data => {
        this.socketStatus = data.connection;
        observer.next(data);
      });
    });
  }



}
