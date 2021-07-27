import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @HostListener('document:click', ['$event'])
  onClick(btn: any) {
    if (btn.path[0].id == "menu") {
      this.ngOnInit();
    }
 }

  constructor() { }
  ngOnInit(): void {
    setTimeout(() => {
      console.log(document.getElementById("drawer")?.clientWidth);
      document.getElementById("mat-drawer-content")?.setAttribute("style", `margin-left: ${document.getElementById("drawer")?.clientWidth+'px'} !important`);
    }, 2200);
  }

}
