import { Component } from '@angular/core';
import SocketService from './services/socket.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'colaborative-text-editor';
  content: string;
  public editor = DecoupledEditor;
  constructor(private socketService: SocketService) {
    this.content = '';
    this.socketService.update().subscribe(data => this.content = data);
  }

  change({editor}: ChangeEvent) {
    const editorData = editor.getData();
    if(this.content !== editorData){
      this.content = editorData;
      this.socketService.type(this.content);
    }
  }
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}
}
