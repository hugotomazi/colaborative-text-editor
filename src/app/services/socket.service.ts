import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {
    socket: SocketIOClient.Socket
    username: string

    constructor() {
        this.socket = io('https://colaborative-text-editor-serve.herokuapp.com/', {transports: ['websocket']})
        this.username = null
        //this.socket = io('http://127.0.0.1:3000/', {transports: ['websocket']})
    }

    identify(username: string) {
        this.username = username
        this.socket.emit('identify', username)
    }

    type(data: string): void {
        this.socket.emit('type', data)
    }

    update(): Observable<string> {
        return new Observable(observer => {
            this.socket.on('update', (data: string) => observer.next(data))
        });
    }

    connectedUsers(): Observable<string[]> {
        return new Observable(observer => {
            this.socket.on('updateUsersList', (data: {users: string[]}) => observer.next(data.users.sort()))
        })
    }

    typing() : Observable<string> {
        return new Observable(observer => {
            this.socket.on('typing', (user: string) => observer.next(user))
        })
    }
}
