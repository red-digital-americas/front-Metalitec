import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loaderService/loader.service';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.scss']
})
export class FinanzasComponent implements OnInit {

  constructor(public loader:LoaderService) { }

  ngOnInit(): void {
     this.loader.callLoader();
  }

}
