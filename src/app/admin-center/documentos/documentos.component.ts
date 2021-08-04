import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  arrayBuffer:any;
  file:any;
  incomingfile(event:any) {
     this.file= event.target.files[0]; 
  }

  Upload() {
      var rows_excel:any;
      let contador = 0;
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            rows_excel = XLSX.utils.sheet_to_json(worksheet,{raw:true});
            console.log(rows_excel);

            for (let i = 0; i < rows_excel.length; i++) {
              console.log(rows_excel[i]); 
              if(rows_excel[i].IdProveedor && rows_excel[i].cantidad && rows_excel[i].razonSocial){
                if(rows_excel[i].IdProveedor!="null"  && rows_excel[i].cantidad !="null"  && rows_excel[i].razonSocial !="null"  ){
                  contador++;
                }
              }
            }

            if(contador == rows_excel.length){
              console.log("CUMPLE CON LAS CARACTERISTICAS DEL EXCEL");
            }else{
              console.log("NO CUMPLE CON LAS CARACTERISTICAS DEL EXCEL");
            }



        }
        fileReader.readAsArrayBuffer(this.file);
  }
}
