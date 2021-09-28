import { environment } from './../../environments/environment';
import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {
    socket: SocketIOClient.Socket
    username: string

    constructor() {
        this.socket = io(environment.apiURL, {transports: ['websocket']})
        this.username = null
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
