import { Component, HostListener, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ConectionapiService } from 'src/app/authService/conectionapi.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public auth: ConectionapiService, public loader: AppComponent) {}

  @HostListener('document:click', ['$event'])
  onClick(btn: any) {
    if (btn.path[0].id == "menu") {
      this.menus();
    }
    console.log('button', btn);
  }


  ngOnInit(): void {}
 
  //***********************************************//
  //CONSULTA DE REPORTES FINANCIEROS//
  getFinance() {
    this.loader.show();
    /*
    this.auth.service_general_get("FinancialReport/Budget-Advance").subscribe(response => {
      console.log("response: ", response)
    },(err)=>{
      console.log("Error: ", err)
    })
    */

    /*
    this.auth.service_general_get("FinancialReport/Operating-Results-Summary").subscribe(response => {
      console.log("response: ", response)
    },(err)=>{
      console.log("Error: ", err)
    })
    */

    /*
    this.auth.service_general_get("FinancialReport/Cash-Flow").subscribe(response => {
      console.log("response: ", response)
    },(err)=>{
      console.log("Error: ", err)
    })
    */

    this.auth.service_general_get("FinancialReport/State-Results").subscribe(response => {
      console.log("response: ", response)
    },(err)=>{
      console.log("Error: ", err)
    })

    
    this.auth.service_general_get("FinancialReport/Main-Account-Evaluation").subscribe(response => {
      console.log("response: ", response)
    },(err)=>{
      console.log("Error: ", err)
    })
    

    
    this.auth.service_general_get("FinancialReport/Balance-Sheet-Summary").subscribe(response => {
      console.log("response: ", response);
      this.loader.hide();
    },(err)=>{
      console.log("Error: ", err)
    })
    

    /*
    this.auth.service_general_get("FinancialReport/Funding-Investment-Operations").subscribe(response => {
      console.log("response: ", response)
      this.loader.hide();
    },(err)=>{
      console.log("Error: ", err)
    })
    */
    
   
  }
  //Supplier Assemblers//
  getSupplierAssemblers() {
    this.loader.show();
    this.auth.service_general_get("SupplierAssemblers/Assembly-Released-On-Site").subscribe(response => {
      console.log("response: ", response)
    },(err)=>{
      console.log("Error: ", err)
    })

    this.auth.service_general_get("SupplierAssemblers/Program-Mounting").subscribe(response => {
      console.log("response: ", response)
    },(err)=>{
      console.log("Error: ", err)
    })


    this.auth.service_general_get("SupplierAssemblers/Top-5").subscribe(response => {
      console.log("response: ", response)
    },(err)=>{
      console.log("Error: ", err)
    })

    this.auth.service_general_get("SupplierAssemblers/Variation-Budget").subscribe(response => {
      console.log("response: ", response)
    },(err)=>{
      console.log("Error: ", err)
    })

    this.auth.service_general_get("SupplierAssemblers/Payments-Assembly").subscribe(response => {
      console.log("response: ", response);
      this.loader.hide();
    },(err)=>{
      console.log("Error: ", err)
    })
  }
  //Supplier Classification//
  getSupplierClassification() {
    this.loader.show();
    this.auth.service_general_get("SupplierClassification/Top").subscribe(response => {
      console.log("response: ", response)
    },(err)=>{
      console.log("Error: ", err)
    })

    /*
    this.auth.service_general_get("SupplierClassification/Materials-Family").subscribe(response => {
      console.log("response: ", response)
    },(err)=>{
      console.log("Error: ", err)
    })
    */


    /*
    this.auth.service_general_get("SupplierClassification/Purchase-History").subscribe(response => {
      console.log("response: ", response)
    },(err)=>{
      console.log("Error: ", err)
    })


    this.auth.service_general_get("SupplierClassification/Price-Trend").subscribe(response => {
      console.log("response: ", response)
    },(err)=>{
      console.log("Error: ", err)
    })
    */

    this.auth.service_general_get("SupplierClassification/Suppliers").subscribe(response => {
      console.log("response: ", response);
      this.loader.hide();
    },(err)=>{
      console.log("Error: ", err)
    })
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