import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loaderService/loader.service';

@Component({
  selector: 'app-montadores',
  templateUrl: './montadores.component.html',
  styleUrls: ['./montadores.component.scss']
})
export class MontadoresComponent implements OnInit {

  constructor(public loader:LoaderService) { }

  ngOnInit(): void {
     this.loader.callLoader();
  }

}
