import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export default class SocketService {
    socket: SocketIOClient.Socket

    constructor() {
        this.socket = io('http://127.0.0.1:8080/', {transports: ['websocket']})
    }

    public type(data: string): void {
        this.socket.emit('type', data)
    }
    
    public update(): Observable<string> {
        return new Observable(observer => {
            this.socket.on('update', (data: string) => observer.next(data))
        });
    }
}
