import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loaderService/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user : any = {
    data: "",
    nombre: ""
  };
  
  
  constructor(public loader:LoaderService) { }

  ngOnInit(): void {
    this.loader.callLoader();
    this.user.data = JSON.parse(localStorage.getItem('user') || '{}');
    this.user.nombre = this.user.data.name + " " + this.user.data.lastName + " " + this.user.data.motherLastName;
    console.log("user : ", this.user);
  }

}
