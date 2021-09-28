import { Component, OnInit, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'colaborative-text-editor';
  constructor(private _elementRef: ElementRef) {

  }

  ngOnInit() {
    this._elementRef.nativeElement.addEventListener('beforeinstallprompt', (evt) => {
      console.log(evt)
    })
  }

}
