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
  public myArr: any [] = [];
  permissionsOperation: PermissionsSubmenu[] = [];
  permissionsPartner: PermissionsSubmenu[] = [];
  permissionsFinace: PermissionsSubmenu[] = [];
  permissionsAdmin: PermissionsSubmenu[] = [];


  validationForm: FormGroup;
  name: FormControl = new FormControl();
  description: FormControl = new FormControl();
  
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


  permisos = {
    "success": true,
    "result": {
      "value": [
        {
          "id": 1,
          "role": "Manager",
          "description": "Role Manager",
          "createdBy": 1,
          "createdDate": "1900-01-01T00:00:00",
          "updateBy": 1,
          "updatedDate": "2021-05-03T20:16:26.98",
          "status": true,
          "permissions": [
            {
              "id": 2,
              "menu": "Operations",
              "submenu": "Dashboard",
              "seccion": "My Dashboard",
              "idCatMenu": 2,
              "role": 1,
              "idCatSubMenu": 2,
              "idCatSeccion": 1,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 3,
              "menu": "Operations",
              "submenu": "Reports   ",
              "seccion": "Reports",
              "idCatMenu": 2,
              "role": 1,
              "idCatSubMenu": 3,
              "idCatSeccion": 2,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 4,
              "menu": "Operations",
              "submenu": "Activity  ",
              "seccion": "Activity",
              "idCatMenu": 2,
              "role": 1,
              "idCatSubMenu": 4,
              "idCatSeccion": 3,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 5,
              "menu": "Operations",
              "submenu": "Service Records",
              "seccion": "Service Record",
              "idCatMenu": 2,
              "role": 1,
              "idCatSubMenu": 5,
              "idCatSeccion": 4,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 9,
              "menu": "Operations",
              "submenu": "Pending Authorizations",
              "seccion": "Pending Authorizations",
              "idCatMenu": 2,
              "role": 1,
              "idCatSubMenu": 6,
              "idCatSeccion": 5,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 10,
              "menu": "Operations",
              "submenu": "Service Calendar",
              "seccion": "Service Calendar",
              "idCatMenu": 2,
              "role": 1,
              "idCatSubMenu": 7,
              "idCatSeccion": 6,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 11,
              "menu": "Operations",
              "submenu": "Experience Surveys",
              "seccion": "Experience Surveys\r\n",
              "idCatMenu": 2,
              "role": 1,
              "idCatSubMenu": 8,
              "idCatSeccion": 7,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 12,
              "menu": "Operations",
              "submenu": "Supplier Partners",
              "seccion": "Supplier Partners\r\n",
              "idCatMenu": 2,
              "role": 1,
              "idCatSubMenu": 9,
              "idCatSeccion": 8,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 13,
              "menu": "Operations",
              "submenu": "Training",
              "seccion": "My Training\r\n",
              "idCatMenu": 2,
              "role": 1,
              "idCatSubMenu": 10,
              "idCatSeccion": 9,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 68,
              "menu": "Partner & Clients",
              "submenu": "Partner & Clients",
              "seccion": "Partner & Clients\r\n",
              "idCatMenu": 3,
              "role": 1,
              "idCatSubMenu": 11,
              "idCatSeccion": 10,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 69,
              "menu": "Partner & Clients",
              "submenu": "Leads",
              "seccion": "Leads\r\n",
              "idCatMenu": 3,
              "role": 1,
              "idCatSubMenu": 12,
              "idCatSeccion": 11,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 82,
              "menu": "Finance",
              "submenu": "Request Center",
              "seccion": "Request Center\r\n",
              "idCatMenu": 4,
              "role": 1,
              "idCatSubMenu": 13,
              "idCatSeccion": 12,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 83,
              "menu": "Finance",
              "submenu": "Invoices Service",
              "seccion": "Invoices Service\r\n",
              "idCatMenu": 4,
              "role": 1,
              "idCatSubMenu": 14,
              "idCatSeccion": 13,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 84,
              "menu": "Finance",
              "submenu": "Invoices Supplier",
              "seccion": "Invoices Supplier\r\n",
              "idCatMenu": 4,
              "role": 1,
              "idCatSubMenu": 20,
              "idCatSeccion": 18,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 85,
              "menu": "Finance",
              "submenu": "Third Party Invoice",
              "seccion": "Third Party Invoice\r\n",
              "idCatMenu": 4,
              "role": 1,
              "idCatSubMenu": 21,
              "idCatSeccion": 19,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 110,
              "menu": "Admin Center",
              "submenu": "Users",
              "seccion": "Users\r\n",
              "idCatMenu": 5,
              "role": 1,
              "idCatSubMenu": 15,
              "idCatSeccion": 14,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 111,
              "menu": "Admin Center",
              "submenu": "Catalogs",
              "seccion": "Catalogs\r\n",
              "idCatMenu": 5,
              "role": 1,
              "idCatSubMenu": 16,
              "idCatSeccion": 15,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 112,
              "menu": "Admin Center",
              "submenu": "System Configration",
              "seccion": "System Configration\r\n",
              "idCatMenu": 5,
              "role": 1,
              "idCatSubMenu": 17,
              "idCatSeccion": 16,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 113,
              "menu": "Admin Center",
              "submenu": "Training Courses",
              "seccion": "Training Courses\r\n",
              "idCatMenu": 5,
              "role": 1,
              "idCatSubMenu": 18,
              "idCatSeccion": 17,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            },
            {
              "id": 139,
              "menu": "Admin Center",
              "submenu": "VIOLET App Configuration",
              "seccion": "VIOLET App Configuration\r\n",
              "idCatMenu": 5,
              "role": 1,
              "idCatSubMenu": 22,
              "idCatSeccion": 20,
              "reading": true,
              "writing": true,
              "editing": true,
              "deleting": true
            }
          ]
        }
      ],
      "formatters": [],
      "contentTypes": [],
      "declaredType": null,
      "statusCode": null
    }
  }



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
            switch (this.data.permissions[i].menu) {
              case 'Operations':
                //for (j = 0; j < this.data.permissions[i].)
                this.permissionsOperation.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: this.data.permissions[i].reading,
                  writing: this.data.permissions[i].writing,
                  editing: this.data.permissions[i].editing,
                  deleting: this.data.permissions[i].deleting
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 9,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsOperation
                  });
                break;
              case 'Partner & Clients':
                this.permissionsPartner.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: this.data.permissions[i].reading,
                  writing: this.data.permissions[i].writing,
                  editing: this.data.permissions[i].editing,
                  deleting: this.data.permissions[i].deleting
                });
                this.permissions.push(
                  {
                    color: '#F9F9F9',
                    cols: 1,
                    rows: 2,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsPartner
                  });
                break;
              case 'Finance':
                this.permissionsFinace.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: this.data.permissions[i].reading,
                  writing: this.data.permissions[i].writing,
                  editing: this.data.permissions[i].editing,
                  deleting: this.data.permissions[i].deleting
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 4,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsFinace
                  });
                break;
              case 'Admin Center':
                this.permissionsAdmin.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: this.data.permissions[i].reading,
                  writing: this.data.permissions[i].writing,
                  editing: this.data.permissions[i].editing,
                  deleting: this.data.permissions[i].deleting
                });
                this.permissions.push(
                  {
                    color: '#F9F9F9',
                    cols: 1,
                    rows: 5,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsAdmin
                  });
                break;
              default:
              // code block
            }
          }

         
         for(let i = 0; i < this.permissions.length; i++){
          if(this.permissions[i].menu == "Operations"){
           this.myArr.push(this.permissions[i]);
           break;
          }
       }

       for(let i = 0; i < this.permissions.length; i++){
         if(this.permissions[i].menu == "Partner & Clients"){
          this.myArr.push(this.permissions[i]);
          break;
         }
       }

       for(let i = 0; i < this.permissions.length; i++){
         if(this.permissions[i].menu == "Finance"){
          this.myArr.push(this.permissions[i]);
          break;
         }
       }

       for(let i = 0; i < this.permissions.length; i++){
         if(this.permissions[i].menu == "Admin Center"){
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
            switch (this.data.permissions[i].menu) {
              case 'Operations':
                //for (j = 0; j < this.data.permissions[i].)
                this.permissionsOperation.push({
                  id: 0,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: false,
                  writing: false,
                  editing: false,
                  deleting: false
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 9,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsOperation
                  });
                break;
              case 'Partner & Clients':
                this.permissionsPartner.push({
                  id: 0,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: false,
                  writing: false,
                  editing: false,
                  deleting: false
                });
                this.permissions.push(
                  {
                    color: '#F9F9F9',
                    cols: 1,
                    rows: 2,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsPartner
                  });
                break;
              case 'Finance':
                this.permissionsFinace.push({
                  id: 0,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: false,
                  writing: false,
                  editing: false,
                  deleting: false
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 4,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsFinace
                  });
                break;
              case 'Admin Center':
                this.permissionsAdmin.push({
                  id: 0,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: false,
                  writing: false,
                  editing: false,
                  deleting: false
                });
                this.permissions.push(
                  {
                    color: '#F9F9F9',
                    cols: 1,
                    rows: 5,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsAdmin
                  });
                break;
              default:
              // code block
            }
          }

          this.myArr.push(this.permissions[0]);
          this.myArr.push(this.permissions[9]);
          this.myArr.push(this.permissions[11]);
          this.myArr.push(this.permissions[15]);
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


  save(){
    
  }

}

class PermissionsMenu {
  color: string = "";
  cols: number = 0;
  rows: number = 0;
  menu: string = "";
  permissionssubmenu: PermissionsSubmenu[] = [];
}

class PermissionsSubmenu {
  id: number = 0;
  role: number = 0;
  idCatMenu: number = 0;
  idCatSubMenu: number = 0;
  idCatSeccion: number = 0;
  submenu: string = '';
  seccion: string = '';
  reading: boolean = false;
  writing: boolean = false;
  editing: boolean = false;
  deleting: boolean = false;
}
