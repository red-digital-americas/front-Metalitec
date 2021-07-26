import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  @HostListener('document:click', ['$event'])
  onClick(btn: any) {
    if (btn.path[0].id == "menu") {
      this.menus();
    }
    console.log('button', btn);
 }


  ngOnInit(): void {
  }
  

  public menu: boolean = true;
  public small: boolean = false;
  public big: boolean = true;

  menus() {
    if (this.menu) {
      this.small = true;
      this.big = false;
      setTimeout(() => {
        this.menu = false;
      }, 200);
    } else {
      this.small = false;
      this.big = true;
      setTimeout(() => {
        this.menu = true;
      }, 200);
    }
  }

}
