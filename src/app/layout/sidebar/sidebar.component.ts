import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

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
      }, 1500);
    }
  }

}
