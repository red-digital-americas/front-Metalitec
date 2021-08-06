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
          for (let i = 0; i < rows_excel.length; i++) {
            claves_json = Object.keys(rows_excel[i])
            console.log(Object.keys(rows_excel[i]))
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
          if(contador_columnas == row_total){ console.log("El excel contiene las columnas correctas") }else{ console.log("El excel no contiene las columnas correctas") }
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

          if(contador_valor_columnas == rows_excel.length){ console.log("El excel contiene el tipo de dato correcto") }else{ console.log("El excel no contiene el tipo de dato correcto") }

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
          } else {
            const dialogRef = this._dialog.open(DialogMessageComponent, {
              data: {
                header: 'Carga de Archivo',
                body: 'El archivo no cumple con el formato correcto por favor verifica el nombre de las columnas y sus valores de cada una de ellas'
              },
              width: '350px',
            });
          }

        }
        fileReader.readAsArrayBuffer(this.file);
        break;
      case 2:
        this.disabledbtn = true;
        var rows_excel: any;
        let countColumnsNombre = 0;
        let contador_valor_columnas2 = 0;
        let fileReader2 = new FileReader();
        fileReader2.onload = (e) => {
          this.arrayBuffer = fileReader2.result;
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
         
          // este for identifica que el nombre de las columnas sea igual 
          for (var key in rows_excel[0]) {
            console.log(key); 
            console.log(rows_excel[0][key]); //valor
            if ((key == "Instalación") ||
            ( key == 'Nombre') ||
            key == ('Fase') ||
            key == ('Descripción') ||
            key == ('Ubicación') ||
            key == ('Cambio') ||
            key == ('Tarea') ||
            key == ('Total Weight (kg)') ||
            key == ('Total Time (Horas)') ||
            key == ('Hrs /  (kg)') ||
            key == ('Allocated Weight (kg)') ||
            key == ('Allocated Time (Horas)') ||
            key == ('Weight (kg)') ||
            key == ('Time (Horas)') ||
            key == ('Weight (kg)_1') ||
            key == ('Time (Horas)_1') ||
            key == ('Weight (kg)_2') ||
            key == ('Time (Horas)_2') ||
            key == ('Weight (kg)_3') ||
            key == ('Time (Horas)_3') ||
            key == ('Weight (kg)_4') ||
            key == ('Time (Horas)_4') ||
            key == ('Weight (kg)_5') ||
            key == ('Time (Horas)_5') 
            )
            {
              countColumnsNombre++;
            }
          }
          if (countColumnsNombre == 24)
          {
            console.log("El excel contiene las columnas correctas")
          }
          else {
            console.log("El excel no contiene las columnas correctas");
            const dialogRef = this._dialog.open(DialogMessageComponent, {
              data: {
                header: 'Error al cargar el archivo',
                body: '<b>Verifica el nombre de las columnas</b>, ya que no coinciden con el archivo requerido'
              },
              width: '350px',
            });
            this.disabledbtn = false;
            return
          }
          for (let i = 0; i < rows_excel.length; i++) {
            const element = rows_excel[i];
            for (var key in element) {
              console.log(key);
              console.log(element[key]);
              if (key == "Instalación") {
                if (typeof (element[key]) == 'string') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Nombre") {
                if (typeof (element[key]) == 'string') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Fase") {
                if (typeof (element[key]) == 'string') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Descripción") {
                if (typeof (element[key]) == 'string') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Ubicación") {
                if (typeof (element[key]) == 'string') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Cambio") {
                if (typeof (element[key]) == 'string') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Tarea") {
                if (typeof (element[key]) == 'string') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Total Weight (kg)") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Total Time (Horas)") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Hrs /  (kg)") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Allocated Weight (kg)") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Allocated Time (Horas)") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Weight (kg)") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Time (Horas)") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Weight (kg)_1") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Time (Horas)_1") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Weight (kg)_2") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Time (Horas)_2") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Weight (kg)_3") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Time (Horas)_3") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Weight (kg)_4") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Time (Horas)_4") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Weight (kg)_5") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
              else if (key == "Time (Horas)_5") {
                if (typeof (element[key]) == 'number') {
                  contador_valor_columnas2++;
                }
              }
            }
          }


          if (contador_valor_columnas2 == rows_excel.length * 24)
          {
            console.log("El excel contiene el tipo de dato correcto")
          }
          else {
            console.log("El excel no contiene el tipo de dato correcto");
            const dialogRef = this._dialog.open(DialogMessageComponent, {
              data: {
                header: 'Error al cargar el archivo',
                body: '<b>Verifica los valores de cada columna</b>, ya que no coinciden con el archivo requerido  '
              },
              width: '350px',
            });
            this.disabledbtn = false;
            return

          }
          console.log('# de nombres de columnas en xls', countColumnsNombre);
          console.log('24 columnas default');
          console.log('# de registros en xls', contador_valor_columnas2);
          console.log('# de registros que trae el excel', rows_excel.length * 24)
          if ((countColumnsNombre == 24) && (contador_valor_columnas2 == rows_excel.length * 24)) {
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
              this.disabledbtn = false;

            }, (error) => {
              console.log(error)
            });
          } else {
            const dialogRef = this._dialog.open(DialogMessageComponent, {
              data: {
                header: 'Carga de Archivo',
                body: 'El archivo no cumple con el formato correcto por favor verifica el nombre de las columnas y sus valores de cada una de ellas'
              },
              width: '350px',
            });
            this.disabledbtn = false;
          }
        }
        fileReader2.readAsArrayBuffer(this.file);
        break;
    }
    if (id_document == null) {
      const dialogRef = this._dialog.open(DialogMessageComponent, {
        data: {
          header: 'Error al cargar el archivo',
          body: 'No has seleccionado ningun documento'
        },
        width: '350px',
      });
      this.disabledbtn = false;

    }
  }
}