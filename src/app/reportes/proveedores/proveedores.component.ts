import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loaderService/loader.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {

  constructor(public loader:LoaderService) { }

  ngOnInit(): void {
     this.loader.callLoader();
  }

}
