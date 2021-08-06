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

  constructor(public auth: ConectionapiService, private http: HttpClient, public _dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCatalogue();
  }

  public type: any = {};
  public caDocuments: any;
  async getCatalogue() {
    this.auth.service_general_get('File/All-Files').subscribe(data => {
      if (data.result) {
        this.caDocuments = data.result;
      }
    })
  }

  arrayBuffer: any;
  file: any;
  incomingfile(event: any) {
    this.file = event.target.files[0];
    console.log("Este es el archivo: ", this.file);
  }

  @ViewChild('avatar') avatar: any;
  url_api = `${environment.API_URL}`;

  onSubmit() {
    let contador_nombre = 0;
    let name_document:any;
    let id_document = null;
    for (let i = 0; i < this.avatar.nativeElement.files.length; i++) {
      for (let j = 0; j < this.caDocuments.length; j++) {
        if (this.avatar.nativeElement.files[i].name == this.caDocuments[j].file) {
          contador_nombre++;
          name_document = this.caDocuments[j].file;
          id_document = this.caDocuments[j].id;
        }
      }
    }

    console.log("Contador: ", contador_nombre);

    switch (id_document) {
      case 1:
        var rows_excel: any;
        let contador = 0;
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          console.log("File reader: ", );
          for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {
            type: "binary"
          });
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          rows_excel = XLSX.utils.sheet_to_json(worksheet, {
            raw: true
          });
          console.log(rows_excel);
          for (let i = 0; i < rows_excel.length; i++) {
            console.log(rows_excel[i]);
            if (rows_excel[i].IdProveedor && rows_excel[i].cantidad && rows_excel[i].razonSocial) {
              if (rows_excel[i].IdProveedor != "null" && rows_excel[i].cantidad != "null" && rows_excel[i].razonSocial != "null") {
                contador++;
              }
            }
          }
          if (contador == rows_excel.length) {
            console.log("CUMPLE CON LAS CARACTERISTICAS DEL EXCEL");
          } else {
            console.log("NO CUMPLE CON LAS CARACTERISTICAS DEL EXCEL");
          }

          if (contador_nombre == 1 && contador == rows_excel.length) {
            let formData = new FormData();
            formData.append('file', this.avatar.nativeElement.files[0], name_document);
            const headers = new HttpHeaders();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            this.http.post(this.url_api + 'File', formData, {
              headers: headers
            }).subscribe((response) => {
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
          } else {
            const dialogRef = this._dialog.open(DialogMessageComponent, {
              data: {
                header: 'Carga de Archivo',
                body: 'El archivo no cumple con el formato correcto por favor verificalo'
              },
              width: '350px',
            });
          }

        }
        fileReader.readAsArrayBuffer(this.file);
        break;
      case 2:
        break;
    }


    if(id_document == null){
      const dialogRef = this._dialog.open(DialogMessageComponent, {
        data: {
          header: 'Carga de Archivo',
          body: 'El archivo no tiene el nombre correcto por favor verificalo'
        },
        width: '350px',
      });
    }
  }




  Upload() {

    var rows_excel: any;
    let contador = 0;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      console.log("File reader: ", );
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {
        type: "binary"
      });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      rows_excel = XLSX.utils.sheet_to_json(worksheet, {
        raw: true
      });
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


}