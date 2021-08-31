import { Component, OnInit, ViewChild } from '@angular/core';
import { ConectionapiService } from 'src/app/authService/conectionapi.service';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DialogMessageComponent } from 'src/app/dialog/dialog-message/dialog-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {

  constructor(public auth: ConectionapiService, private http: HttpClient, public _dialog: MatDialog) { }
 
  public disabledbtn = false;
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

  name_document_:any;
  getName(){
    for (let j = 0; j < this.caDocuments.length; j++) {
      if (this.type.documentID == this.caDocuments[j].id) {
        this.name_document_ = this.caDocuments[j].file;
      }
    }
  }

  arrayBuffer: any;
  file: any;
  incomingfile(event: any) {
    this.file = event.target.files[0];
    console.log("Este es el archivo: ", this.file);
  }

  @ViewChild('avatar') avatar: any;
  url_api = `${environment.API_URL}`;
  

  async onSubmit() {
    let contador_nombre = 0;
    let name_document: any;
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
    await this.getName();
    if(contador_nombre == 0){
      const dialogRef = this._dialog.open(DialogMessageComponent, {
        data: {
          header: 'Nombre del archivo',
          body: 'El nombre del archivo no corresponde al témplate '+ this.name_document_ +', por favor revisa y vuelve a subir.'
        },
        width: '500px',
      });
    }
    console.log("Contador: ", contador_nombre);

    switch (id_document) {
      case 1:
        var rows_excel: any;
        let contador_columnas = 0;
        let contador_valor_columnas = 0;
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
          let claves_json : any;
          let columnas = ["idproyecto", "proyecto", "ingresos", "COSTO", "PESO PROYECTO"];
          for (let i = 0; i < rows_excel.length; i++) {
            claves_json = Object.keys(rows_excel[i]);
            console.log(Object.keys(rows_excel[i]));
            if(claves_json.length != columnas.length){
              console.log("columnas incorrectas");
              const dialogRef = this._dialog.open(DialogMessageComponent, {
                data: {
                  header: 'Numero de columnas',
                  body: 'El número columnas del archivo no corresponde al témplate '+ this.name_document_ +', por favor revisa y vuelve a subir.'
                },
                width: '500px',
              });
              break
            }
            for (let j = 0; j < claves_json.length; j++) {
              if (claves_json[i] == "idproyecto") {
                contador_columnas++;
              }
              if (claves_json[i] == "proyecto") {
                contador_columnas++;
              }
              if (claves_json[i] == "ingresos") {
                contador_columnas++;
              }
              if (claves_json[i] == "COSTO") {
                contador_columnas++;
              }
              if (claves_json[i] == "PESO PROYECTO") {
                contador_columnas++;
              }
            }
          }
          let row_total = rows_excel.length*5;
          if(contador_columnas == row_total){ 
            console.log("El excel contiene las columnas correctas") 
          }else{ 
            const dialogRef = this._dialog.open(DialogMessageComponent, {
              data: {
                header: 'Nombre de columnas',
                body: 'El nombre de las columnas del archivo no corresponde al témplate '+ this.name_document_ +', por favor revisa y vuelve a subir.'
              },
              width: '500px',
            });
          }
          let values_json:any;
          let array_renombrado = [];
          for (let i = 0; i < rows_excel.length; i++) {
            values_json = Object.values(rows_excel[i])
              array_renombrado.push({
                idproyecto:values_json[0],
                proyecto:values_json[1],
                ingresos:values_json[2],
                costo:values_json[3],
                pesoProyecto:values_json[4],
              })
          }

          console.log(array_renombrado);
          debugger
          for (let i = 0; i < array_renombrado.length; i++) {
            claves_json = Object.keys(array_renombrado[i])
            if (typeof(array_renombrado[i].idproyecto) == 'number' && typeof(array_renombrado[i].proyecto) == 'string' && typeof(array_renombrado[i].ingresos) == "number" && typeof(array_renombrado[i].costo) == 'number' && typeof(array_renombrado[i].pesoProyecto) == 'number') {
              contador_valor_columnas++;
            }
          }

          if(contador_valor_columnas == rows_excel.length){ 
            console.log("El excel contiene el tipo de dato correcto") 
          }else{ 
            console.log("El excel no contiene el tipo de dato correcto");
            const dialogRef = this._dialog.open(DialogMessageComponent, {
              data: {
                header: 'Tipo de dato en celda',
                body: 'Existen datos incorrectos en alguna celda del archivo, no corresponde al témplate '+ this.name_document_ +', por favor revisa y vuelve a subir.'
              },
              width: '500px',
            });
          }

           console.log(contador_nombre)
           console.log(contador_valor_columnas)
          if (contador_columnas == row_total && contador_valor_columnas == rows_excel.length) {
            let formData = new FormData();
            formData.append('file', this.avatar.nativeElement.files[0], name_document);
            const headers = new HttpHeaders();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            this.http.post(this.url_api + 'File', formData, {
              headers: headers
            }).subscribe((response:any) => {
              if(response.success){
                console.log("response; ", response);
                const dialogRef = this._dialog.open(DialogMessageComponent, {
                data: {
                  header: 'Carga de Archivo',
                  body: 'Se ha cargado el archivo exitosamente.'
                },
                  width: '350px',
                });
              }else{
                const dialogRef = this._dialog.open(DialogMessageComponent, {
                  data: {
                    header: 'Carga de Archivo',
                    body: response.message
                  },
                    width: '350px',
                  });
              }
            }, (error) => {
              console.log(error)
            });
          }
        }
        fileReader.readAsArrayBuffer(this.file);
        break;
        case 2:
        var rows_excel: any;
        let contador_columnas_ = 0;
        let contador_valor_columnas_ = 0;
        let fileReader_ = new FileReader();
        fileReader_.onload = (e) => {
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
          let claves_json : any;
          let columnas = ["Instalación", "Nombre", "Fase", "Descripción", "Ubicación", "Cambio", "Tarea", "Total Weight (kg)", "Total Time (Horas)", "Hrs /  (kg)", "Allocated Weight (kg)", "Allocated Time (Horas)", "Weight (kg)", "Time (Horas)", "Weight (kg)_1", "Time (Horas)_1", "Weight (kg)_2", "Time (Horas)_2", "Weight (kg)_3", "Time (Horas)_3", "Weight (kg)_4", "Time (Horas)_4", "Weight (kg)_5", "Time (Horas)_5"];
          for (let i = 0; i < rows_excel.length; i++) {
            claves_json = Object.keys(rows_excel[i]);
            console.log(Object.keys(rows_excel[i]));
            if(claves_json.length != columnas.length){
              console.log("columnas incorrectas");
              const dialogRef = this._dialog.open(DialogMessageComponent, {
                data: {
                  header: 'Numero de columnas',
                  body: 'El número columnas del archivo no corresponde al témplate '+ this.name_document_ +', por favor revisa y vuelve a subir.'
                },
                width: '500px',
              });
              break
            }
            for (let j = 0; j < claves_json.length; j++) {
              if (claves_json[i] == "Instalación") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Nombre") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Fase") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Descripción") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Ubicación") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Cambio") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Tarea") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Total Weight (kg)") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Total Time (Horas)") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Hrs /  (kg)") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Allocated Weight (kg)") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Allocated Time (Horas)") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Weight (kg)") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Time (Horas)") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Weight (kg)_1") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Time (Horas)_1") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Weight (kg)_2") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Time (Horas)_2") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Weight (kg)_3") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Time (Horas)_3") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Weight (kg)_4") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Time (Horas)_4") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Weight (kg)_5") {
                contador_columnas_++;
              }
              if (claves_json[i] == "Time (Horas)_5") {
                contador_columnas_++;
              }
            }
          }
          let row_total = rows_excel.length*24;
          if(contador_columnas_ == row_total){ 
            console.log("El excel contiene las columnas correctas") 
          }else{ 
            const dialogRef = this._dialog.open(DialogMessageComponent, {
              data: {
                header: 'Nombre de columnas',
                body: 'El nombre de las columnas del archivo no corresponde al témplate '+ this.name_document_ +', por favor revisa y vuelve a subir.'
              },
              width: '500px',
            });
          }
          let values_json:any;
          let array_renombrado = [];
          for (let i = 0; i < rows_excel.length; i++) {
            values_json = Object.values(rows_excel[i])
              array_renombrado.push({
                Instalacion:values_json[0],
                Nombre:values_json[1],
                Fase:values_json[2],
                Descripcion:values_json[3],
                Ubicacion:values_json[4],
                Cambio:values_json[5],
                Tarea:values_json[6],
                TotalWeight:values_json[7],
                TotalTime:values_json[8],
                Hrskg:values_json[9],
                AllocatedWeightkg:values_json[10],
                AllocatedTimeHoras:values_json[11],
                Weightkg:values_json[12],
                TimeHoras:values_json[13],
                Weightkg_1:values_json[14],
                TimeHoras_1:values_json[15],
                Weightkg_2:values_json[16],
                TimeHoras_2:values_json[17],
                Weightkg_3:values_json[18],
                TimeHoras_3:values_json[19],
                Weightkg_4:values_json[20],
                TimeHoras_4:values_json[21],
                Weightkg_5:values_json[22],
                TimeHoras_5:values_json[23],
              })
          }

          console.log(array_renombrado);
          debugger
          for (let i = 0; i < array_renombrado.length; i++) {
            claves_json = Object.keys(array_renombrado[i])
            if (typeof(array_renombrado[i].Instalacion) == 'string' && typeof(array_renombrado[i].Nombre) == 'string' 
            && typeof(array_renombrado[i].Fase) == "string" && typeof(array_renombrado[i].Descripcion) == 'string' 
            && typeof(array_renombrado[i].Ubicacion) == 'string' && typeof(array_renombrado[i].Cambio) == 'string'
            && typeof(array_renombrado[i].Tarea) == 'string'  && typeof(array_renombrado[i].TotalWeight) == 'number'  
            && typeof(array_renombrado[i].TotalTime) == 'number'  && typeof(array_renombrado[i].Hrskg) == 'number'
            && typeof(array_renombrado[i].AllocatedWeightkg) == 'number' && typeof(array_renombrado[i].AllocatedTimeHoras) == 'number' 
            && typeof(array_renombrado[i].Weightkg) == 'number'  && typeof(array_renombrado[i].TimeHoras) == 'number' 
            && typeof(array_renombrado[i].TimeHoras_1) == 'number' && typeof(array_renombrado[i].Weightkg_1) == 'number'
            && typeof(array_renombrado[i].TimeHoras_2) == 'number' && typeof(array_renombrado[i].Weightkg_2) == 'number'
            && typeof(array_renombrado[i].TimeHoras_3) == 'number' && typeof(array_renombrado[i].Weightkg_3) == 'number'
            && typeof(array_renombrado[i].TimeHoras_4) == 'number' && typeof(array_renombrado[i].Weightkg_4) == 'number'
            && typeof(array_renombrado[i].TimeHoras_5) == 'number' && typeof(array_renombrado[i].Weightkg_5) == 'number'
            ) {
              contador_valor_columnas++;
            }
          }

          if(contador_valor_columnas == rows_excel.length){ 
            console.log("El excel contiene el tipo de dato correcto") 
          }else{ 
            console.log("El excel no contiene el tipo de dato correcto");
            const dialogRef = this._dialog.open(DialogMessageComponent, {
              data: {
                header: 'Tipo de dato en celda',
                body: 'Existen datos incorrectos en alguna celda del archivo, no corresponde al témplate '+ this.name_document_ +', por favor revisa y vuelve a subir.'
              },
              width: '500px',
            });
          }

           console.log(contador_nombre)
           console.log(contador_valor_columnas_)
          if (contador_columnas_ == row_total && contador_valor_columnas_ == rows_excel.length) {
            let formData = new FormData();
            formData.append('file', this.avatar.nativeElement.files[0], name_document);
            const headers = new HttpHeaders();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            this.http.post(this.url_api + 'File', formData, {
              headers: headers
            }).subscribe((response:any) => {
              if(response.success){
                console.log("response; ", response);
                const dialogRef = this._dialog.open(DialogMessageComponent, {
                data: {
                  header: 'Carga de Archivo',
                  body: 'Se ha cargado el archivo exitosamente.'
                },
                  width: '350px',
                });
              }else{
                const dialogRef = this._dialog.open(DialogMessageComponent, {
                  data: {
                    header: 'Carga de Archivo',
                    body: response.message
                  },
                    width: '350px',
                  });
              }
            }, (error) => {
              console.log(error)
            });
          }
        }
        fileReader_.readAsArrayBuffer(this.file);
        break;
    }
  }
}