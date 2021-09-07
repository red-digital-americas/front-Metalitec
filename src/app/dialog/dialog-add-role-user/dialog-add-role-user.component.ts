import { Component, OnInit, Inject} from '@angular/core';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConectionapiService } from 'src/app/authService/conectionapi.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoaderService } from 'src/app/loaderService/loader.service';




@Component({
  selector: 'app-dialog-add-role-user',
  templateUrl: './dialog-add-role-user.component.html',
  styleUrls: ['./dialog-add-role-user.component.scss']
})
export class DialogAddRoleUserComponent implements OnInit {

  public permissions: PermissionsMenu[] = [];

  permissionsDireccionGeneral: PermissionsSubmenu[] = [];
  permissionsDireccionOperaciones: PermissionsSubmenu[] = [];
  permissionsGerenteFinanzas: PermissionsSubmenu[] = [];
  permissionsOperacionesProduccion: PermissionsSubmenu[] = [];
  permissionsOperacionesCalidad: PermissionsSubmenu[] = [];
  permissionsDireccionTecnica: PermissionsSubmenu[] = [];


  validationForm: FormGroup;
  name: FormControl = new FormControl("", [Validators.required]);
  description: FormControl = new FormControl("", [Validators.required]);
  
  constructor(
    public dialogRef: MatDialogRef<DialogAddRoleUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ConectionapiService,
    public _dialog: MatDialog,
    private formBuilder: FormBuilder,
    public loader: LoaderService
  ) 
  { 
    this.validationForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
    });
  }

  public validar: boolean = false;
  public user: any;
  public btnDisables = false; //desactiva el save 
  public myArr: any[] = [];
  permisos = {
    "success":true,
    "result":{
       "value":[
          {
             "id":1,
             "role":"Manager",
             "description":"Role Manager",
             "createdBy":1,
             "createdDate":"1900-01-01T00:00:00",
             "updateBy":1,
             "updatedDate":"2021-05-03T20:16:26.98",
             "status":true,
             "permissions":[
                {
                   "id":1,
                   "perfil":"Dirección general",
                   "idCatPerfil":1,
                   "role":1,
                   "administrador":true,
                   "produccion":true,
                   "financieros":true,
                   "trabajadores":true,
                   "proveedores":true,
                   "montadores":true
                },
                {
                   "id":2,
                   "perfil":"Dirección operaciones",
                   "idCatPerfil":2,
                   "role":1,
                   "administrador":true,
                   "produccion":true,
                   "financieros":true,
                   "trabajadores":true,
                   "proveedores":true,
                   "montadores":true
                },
                {
                   "id":3,
                   "perfil":"Gerente finanzas",
                   "idCatPerfil":3,
                   "role":1,
                   "administrador":true,
                   "produccion":true,
                   "financieros":true,
                   "trabajadores":true,
                   "proveedores":true,
                   "montadores":true
                },
                {
                   "id":4,
                   "perfil":"Operaciones Producción",
                   "idCatPerfil":4,
                   "role":1,
                   "administrador":true,
                   "produccion":true,
                   "financieros":true,
                   "trabajadores":true,
                   "proveedores":true,
                   "montadores":true
                },
                {
                   "id":5,
                   "perfil":"Operaciones Calidad",
                   "idCatPerfil":5,
                   "role":1,
                   "administrador":true,
                   "produccion":true,
                   "financieros":true,
                   "trabajadores":true,
                   "proveedores":true,
                   "montadores":true
                },
                {
                   "id":6,
                   "perfil":"Dirección Técnica - Comercial (Antonio de León)",
                   "idCatPerfil":6,
                   "role":1,
                   "administrador":true,
                   "produccion":true,
                   "financieros":true,
                   "trabajadores":true,
                   "proveedores":true,
                   "montadores":true
                }
             ]
          }
       ],
       "formatters":[
          
       ],
       "contentTypes":[
          
       ],
       "declaredType":null,
       "statusCode":null
    }
 }

 selectAll: boolean = false;

  ngOnInit(): void {
    this.loader.show();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('data user log', this.user);
    console.log('Data que recibe role', this.data);
    if (this.data.id != 0) {

      // this._services.service_general_get(`Catalog/GetRole/${this.data.id}`).subscribe(r => 
      //   {
          if (this.permisos.success) {
          this.data = this.permisos.result.value[0];

          for (var i = 0; i < this.data.permissions.length; i++) {
            switch (this.data.permissions[i].perfil) {
              case 'Dirección general':
                // permissionsDireccionGeneral
                this.permissionsDireccionGeneral.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatPerfil: this.data.permissions[i].idCatPerfil,
                  administrador: this.data.permissions[i].administrador,
                  produccion: this.data.permissions[i].produccion,
                  financieros: this.data.permissions[i].financieros,
                  trabajadores: this.data.permissions[i].trabajadores,
                  proveedores: this.data.permissions[i].proveedores,
                  montadores: this.data.permissions[i].montadores,
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 9,
                    perfil: this.data.permissions[i].perfil,
                    permissionssubmenu: this.permissionsDireccionGeneral
                  });
                break;
              case 'Dirección operaciones':
                this.permissionsDireccionOperaciones.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatPerfil: this.data.permissions[i].idCatPerfil,
                  administrador: this.data.permissions[i].administrador,
                  produccion: this.data.permissions[i].produccion,
                  financieros: this.data.permissions[i].financieros,
                  trabajadores: this.data.permissions[i].trabajadores,
                  proveedores: this.data.permissions[i].proveedores,
                  montadores: this.data.permissions[i].montadores,
                });
                this.permissions.push(
                  {
                    color: '#F9F9F9',
                    cols: 1,
                    rows: 2,
                    perfil: this.data.permissions[i].perfil,
                    permissionssubmenu: this.permissionsDireccionOperaciones
                  });
                break;
              case 'Gerente finanzas':
                this.permissionsGerenteFinanzas.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatPerfil: this.data.permissions[i].idCatPerfil,
                  administrador: this.data.permissions[i].administrador,
                  produccion: this.data.permissions[i].produccion,
                  financieros: this.data.permissions[i].financieros,
                  trabajadores: this.data.permissions[i].trabajadores,
                  proveedores: this.data.permissions[i].proveedores,
                  montadores: this.data.permissions[i].montadores,
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 4,
                    perfil: this.data.permissions[i].perfil,
                    permissionssubmenu: this.permissionsGerenteFinanzas
                  });
                break;
              case 'Operaciones Producción':
                this.permissionsOperacionesProduccion.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatPerfil: this.data.permissions[i].idCatPerfil,
                  administrador: this.data.permissions[i].administrador,
                  produccion: this.data.permissions[i].produccion,
                  financieros: this.data.permissions[i].financieros,
                  trabajadores: this.data.permissions[i].trabajadores,
                  proveedores: this.data.permissions[i].proveedores,
                  montadores: this.data.permissions[i].montadores,
                });
                this.permissions.push(
                  {
                    color: '#F9F9F9',
                    cols: 1,
                    rows: 5,
                    perfil: this.data.permissions[i].perfil,
                    permissionssubmenu: this.permissionsOperacionesProduccion
                  });
                break;
              case 'Operaciones Calidad':
                //for (j = 0; j < this.data.permissions[i].)
                this.permissionsOperacionesCalidad.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatPerfil: this.data.permissions[i].idCatPerfil,
                  administrador: this.data.permissions[i].administrador,
                  produccion: this.data.permissions[i].produccion,
                  financieros: this.data.permissions[i].financieros,
                  trabajadores: this.data.permissions[i].trabajadores,
                  proveedores: this.data.permissions[i].proveedores,
                  montadores: this.data.permissions[i].montadores,
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 9,
                    perfil: this.data.permissions[i].perfil,
                    permissionssubmenu: this.permissionsOperacionesCalidad
                  });
                break;
              case 'Dirección Técnica - Comercial (Antonio de León)':
                this.permissionsDireccionTecnica.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatPerfil: this.data.permissions[i].idCatPerfil,
                  administrador: this.data.permissions[i].administrador,
                  produccion: this.data.permissions[i].produccion,
                  financieros: this.data.permissions[i].financieros,
                  trabajadores: this.data.permissions[i].trabajadores,
                  proveedores: this.data.permissions[i].proveedores,
                  montadores: this.data.permissions[i].montadores,
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 9,
                    perfil: this.data.permissions[i].perfil,
                    permissionssubmenu: this.permissionsDireccionTecnica
                  });
                break;
              default:
            }
          }

         for(let i = 0; i < this.permissions.length; i++){
            if(this.permissions[i].perfil == "Dirección general"){
            this.myArr.push(this.permissions[i]);
            break;
            }
          }

          for(let i = 0; i < this.permissions.length; i++){
            if(this.permissions[i].perfil == "Dirección operaciones"){
              this.myArr.push(this.permissions[i]);
              break;
            }
          }

          for(let i = 0; i < this.permissions.length; i++){
            if(this.permissions[i].perfil == "Gerente finanzas"){
              this.myArr.push(this.permissions[i]);
              break;
            }
          }

          for(let i = 0; i < this.permissions.length; i++){
            if(this.permissions[i].perfil == "Operaciones Producción"){
              this.myArr.push(this.permissions[i]);
              break;
            }
          }
          for(let i = 0; i < this.permissions.length; i++){
            if(this.permissions[i].perfil == "Operaciones Calidad"){
              this.myArr.push(this.permissions[i]);
              break;
            }
          }
          for(let i = 0; i < this.permissions.length; i++){
            if(this.permissions[i].perfil == "Dirección Técnica - Comercial (Antonio de León)"){
              this.myArr.push(this.permissions[i]);
              break;
            }
          }
          //const newArr = this.permissions.filter((el: any, index) => myArr.indexOf(el) === index)

          console.log(this.myArr);
          console.log('respuesta de actualizacion', this.permissions);
          }
      // });
    }
    else {
      // this._services.service_general_get(`Catalog/GetRole/1`).subscribe(r => {
        if (this.permisos.success) {
          this.data = this.permisos.result.value[0];
          this.data.id = 0;
          this.data.role = "";
          this.data.description = ""
          this.data.createdDate = null;

          for (var i = 0; i < this.data.permissions.length; i++) {
            switch (this.data.permissions[i].perfil) {
              case 'Dirección general':
                this.permissionsDireccionGeneral.push({
                  id: 0,
                  role: this.data.id,
                  idCatPerfil: this.data.permissions[i].idCatPerfil,
                  administrador: false,
                  produccion: false,
                  financieros: false,
                  trabajadores: false,
                  proveedores: false,
                  montadores: false
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 9,
                    perfil: this.data.permissions[i].perfil,
                    permissionssubmenu: this.permissionsDireccionGeneral
                  });
                break;
              case 'Dirección operaciones':
                this.permissionsDireccionOperaciones.push({
                  id: 0,
                  role: this.data.id,
                  idCatPerfil: this.data.permissions[i].idCatPerfil,
                  administrador: false,
                  produccion: false,
                  financieros: false,
                  trabajadores: false,
                  proveedores: false,
                  montadores: false
                });
                this.permissions.push(
                  {
                    color: '#F9F9F9',
                    cols: 1,
                    rows: 2,
                    perfil: this.data.permissions[i].perfil,
                    permissionssubmenu: this.permissionsDireccionOperaciones
                  });
                break;
              case 'Gerente finanzas':
                this.permissionsGerenteFinanzas.push({
                  id: 0,
                  role: this.data.id,
                  idCatPerfil: this.data.permissions[i].idCatPerfil,
                  administrador: false,
                  produccion: false,
                  financieros: false,
                  trabajadores: false,
                  proveedores: false,
                  montadores: false
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 4,
                    perfil: this.data.permissions[i].perfil,
                    permissionssubmenu: this.permissionsGerenteFinanzas
                  });
                break;
              case 'Operaciones Producción':
                this.permissionsOperacionesProduccion.push({
                  id: 0,
                  role: this.data.id,
                  idCatPerfil: this.data.permissions[i].idCatPerfil,
                  administrador: false,
                  produccion: false,
                  financieros: false,
                  trabajadores: false,
                  proveedores: false,
                  montadores: false
                });
                this.permissions.push(
                  {
                    color: '#F9F9F9',
                    cols: 1,
                    rows: 5,
                    perfil: this.data.permissions[i].perfil,
                    permissionssubmenu: this.permissionsOperacionesProduccion
                  });
              break;
              case 'Operaciones Calidad':
                this.permissionsOperacionesCalidad.push({
                  id: 0,
                  role: this.data.id,
                  idCatPerfil: this.data.permissions[i].idCatPerfil,
                  administrador: false,
                  produccion: false,
                  financieros: false,
                  trabajadores: false,
                  proveedores: false,
                  montadores: false
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 5,
                    perfil: this.data.permissions[i].perfil,
                    permissionssubmenu: this.permissionsOperacionesCalidad
                  });
              break;

              case 'Dirección Técnica - Comercial (Antonio de León)':
              this.permissionsDireccionTecnica.push({
                id: 0,
                role: this.data.id,
                idCatPerfil: this.data.permissions[i].idCatPerfil,
                administrador: false,
                produccion: false,
                financieros: false,
                trabajadores: false,
                proveedores: false,
                montadores: false
              });
              this.permissions.push(
                {
                  color: '#F9F9F9',
                  cols: 1,
                  rows: 5,
                  perfil: this.data.permissions[i].perfil,
                  permissionssubmenu: this.permissionsDireccionTecnica
                });
            break;

              default:
              // code block
            }
          }

          this.myArr.push(this.permissions[0]);
          this.myArr.push(this.permissions[1]);
          this.myArr.push(this.permissions[2]);
          this.myArr.push(this.permissions[3]);
          this.myArr.push(this.permissions[4]);
          this.myArr.push(this.permissions[5]);

          /*
          for(let i = 0; i < this.permissions.length; i++){
             if(this.permissions[i].menu == "Operations"){
              this.myArr.push(this.permissions[i]);
              return true;
             }
          }

          for(let i = 0; i < this.permissions.length; i++){
            if(this.permissions[i].menu == "Partner & Clients"){
             this.myArr.push(this.permissions[i]);
             return true;
            }
          }

          for(let i = 0; i < this.permissions.length; i++){
            if(this.permissions[i].menu == "Finance"){
             this.myArr.push(this.permissions[i]);
             return true;
            }
          }

          for(let i = 0; i < this.permissions.length; i++){
            if(this.permissions[i].menu == "Admin Center"){
             this.myArr.push(this.permissions[i]);
             return true;
            }
          }
          */
          //const newArr = this.permissions.filter((el: any, index) => myArr.indexOf(el) === index)

          console.log(this.myArr);

          console.log('respuesta de actualizacion', this.permissions);
        }
      // });
    }
    this.loader.hide();
  }

  AllRole() {
    this.selectAll = true;
    console.log('select all permissions');
    // recorremos el array

    for (let i = 0; i < this.myArr.length; i++) {
      const arr = this.myArr[i];
      for (let o = 0; o < arr.permissionssubmenu.length; o++) {
        const permisos = arr.permissionssubmenu[o];
        permisos.administrador = true;
        permisos.produccion = true;
        permisos.financieros = true;
        permisos.trabajadores = true;
        permisos.proveedores = true;
        permisos.montadores = true;
        
      }
    }
  }
  unSelectRole() {
    this.selectAll = false;
    console.log('unselect all permissions');
    // recorremos el array
    for (let i = 0; i < this.myArr.length; i++) {
      const arr = this.myArr[i];
      for (let o = 0; o < arr.permissionssubmenu.length; o++) {
        const permisos = arr.permissionssubmenu[o];
        permisos.administrador = false;
        permisos.produccion = false;
        permisos.financieros = false;
        permisos.trabajadores = false;
        permisos.proveedores = false;
        permisos.montadores = false;
      }
    }
  }
    // this.myArr.forEach(menu => {
    //   menu.permissionssubmenu.forEach(permisos => {
    //     permisos.administrador = false;
    //     permisos.produccion = false;
    //     permisos.financieros = false;
    //     permisos.trabajadores = false;
    //     permisos.proveedores = false;
    //     permisos.montadores = false;
    //   });
    // });
  


  save(){
    this.dialogRef.close(1);
  }

}

class PermissionsMenu {
  color: string = "";
  cols: number = 0;
  rows: number = 0;
  perfil: string = "";
  permissionssubmenu: PermissionsSubmenu[] = [];
}

class PermissionsSubmenu {
  id: number = 0;
  role: number = 0;
  idCatPerfil: number = 0;
  administrador: boolean = false;
  produccion: boolean = false;
  financieros: boolean = false;
  trabajadores: boolean = false;
  proveedores: boolean = false;
  montadores: boolean = false;
}



