import { Component, OnInit } from '@angular/core';
import {SocketService} from './../services/socket.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-principal',
  templateUrl: './view-principal.component.html',
  styleUrls: ['./view-principal.component.css']
})
export class ViewPrincipalComponent implements OnInit {
  content: string;
  public editor = DecoupledEditor;
  public locked: boolean
  constructor(private socketService: SocketService, private router: Router) {
    this.content = '';
  }

  change({editor} : ChangeEvent) {
    const editorData = editor.getData();
    if (this.content !== editorData) {
      this.content = editorData;
      this.socketService.type(this.content);
    }
  }

  onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  ngOnInit() {
    if(!this.socketService.username)
      this.router.navigate(['/'])

    this.socketService.update().subscribe(data => this.content = data);
    this.socketService.typing().subscribe(user => this.locked = (user !== null && user !== this.socketService.username))
  }

}
