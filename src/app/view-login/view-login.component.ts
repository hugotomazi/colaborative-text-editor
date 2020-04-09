import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-login',
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.css']
})
export class ViewLoginComponent implements OnInit {
  username: string

  constructor(private socketService: SocketService, private router: Router) { }

  identify() {
    if(!this.username || this.username.length === 0)
      return alert("Insira um Nome para continuar.")

    this.socketService.identify(this.username)
    this.router.navigate(['/texteditor'])
  }

  ngOnInit() {
    if (this.socketService.username)
      this.router.navigate(['/texteditor'])
  }

}
