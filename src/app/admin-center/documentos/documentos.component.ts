import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConectionapiService } from 'src/app/authService/conectionapi.service';
import * as XLSX from 'xlsx';
import {HttpClient} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DialogMessageComponent } from 'src/app/dialog/dialog-message/dialog-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {

  constructor(public auth: ConectionapiService, private http: HttpClient, public _dialog:MatDialog) { }

  ngOnInit(): void {

  }

  arrayBuffer:any;
  file:any;
  incomingfile(event:any) {
     this.file= event.target.files[0];
     console.log("Este es el archivo: ", this.file); 
  }

  Upload() {

      var rows_excel:any;
      let contador = 0;
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            console.log("File reader: ", );
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            rows_excel = XLSX.utils.sheet_to_json(worksheet,{raw:true});
            console.log(rows_excel);
            
            /*
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
            */
        }
        fileReader.readAsArrayBuffer(this.file);
  }

  @ViewChild('avatar') avatar : any;
  url_api = `${environment.API_URL}`;

  onSubmit() {      
    let formData = new FormData();
    formData.append('file',this.avatar.nativeElement.files[0], '002-Avance_presupuestal_contratado.xlsx');
    const headers = new HttpHeaders();
    
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.http.post(this.url_api+'File', formData, {headers: headers}).subscribe( (response) => {
        console.log("response; ", response);
        const dialogRef = this._dialog.open(DialogMessageComponent, {
          data: {
            header: 'Carga de Archivo',
            body: 'Se ha cargado el archivo exitosamente.'
          },
          width: '350px',
        });
      }, (error) => {
        console.log(error)
      });
  }

}
