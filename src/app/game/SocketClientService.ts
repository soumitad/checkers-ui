import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SocketUpdate} from './checkers.service';
import {Socket} from 'ngx-socket-io';


@Injectable()
export class SocketClientService {
    // @ts-ignore
    constructor(private socket: Socket) {}
    sendMessage(socketMessage: SocketUpdate) {
        this.socket.emit('gameplay-sendUpdate', socketMessage);
    }

    // HANDLER
    onNewMessage(): Observable<SocketUpdate> {
        return this.socket.fromEvent<SocketUpdate>('gameplay-receiveUpdate');
    }
}
