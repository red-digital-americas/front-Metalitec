import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public _router:Router) { }

  public user : any = {
    data: "",
    nombre: ""
  };

  ngOnInit(): void {
    this.user.data = JSON.parse(localStorage.getItem('user') || '{}');
    this.user.nombre = this.user.data.name + " " + this.user.data.lastName + " " + this.user.data.motherLastName;
  }


  logout(){
    console.log("Cierre de sesion");
    localStorage.removeItem("user");
    this._router.navigateByUrl("");
  }

}
