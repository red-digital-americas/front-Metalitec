import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router:Router) {}

  ngOnInit(): void {}

  selectedIndex = 0;
  selectTab(index: number): void {
    this.selectedIndex = index;
  }

  public type_input = 'password';
  public eyed : boolean = false;
  public changeType(type:any) {
     if(type == true){
      this.type_input = 'text';
      this.eyed = true;
     }else{
      this.type_input = 'password';
      this.eyed = false;
     }
  }

  login(){
    this.router.navigate(['/home']);
  }

}