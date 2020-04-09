import { Component, OnInit } from '@angular/core';
import {SocketService} from 'src/app/services/socket.service';

@Component({
  selector: 'app-connected-users',
  templateUrl: './connected-users.component.html',
  styleUrls: ['./connected-users.component.css']
})
export class ConnectedUsersComponent implements OnInit {
  users: string[]
  username: string
  typing: string

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.connectedUsers().subscribe(users => this.users = users)
    this.socketService.typing().subscribe(user => this.typing = user)
    
    this.username = this.socketService.username
  }

}
