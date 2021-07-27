import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Metalitec-Web';

  constructor(private spinner: NgxSpinnerService){

  }


  show(){
    this.spinner.show();
  }

  hide(){
    this.spinner.hide();
  }


}
