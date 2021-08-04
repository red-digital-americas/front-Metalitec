import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Metalitec';

  constructor(public _router:Router){
     
  }

  ngOnInit(): void {
     if(localStorage.getItem('user')){
        this._router.navigateByUrl('home/dashboard');
     }else{
      this._router.navigateByUrl('');
     }
  }





}
