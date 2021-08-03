import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Metalitec';

  constructor(private spinner: NgxSpinnerService, public _router:Router){
     
  }

  ngOnInit(): void {
     if(localStorage.getItem('user')){
        this._router.navigateByUrl('home/dashboard');
     }else{
      this._router.navigateByUrl('');
     }
  }


  show(){
    this.spinner.show();
  }

  hide(){
    this.spinner.hide();
  }


}
