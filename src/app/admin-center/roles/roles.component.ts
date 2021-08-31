import { Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ConectionapiService } from 'src/app/authService/conectionapi.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAddRoleUserComponent } from './../../dialog/dialog-add-role-user/dialog-add-role-user.component';
import { DialogMessageComponent } from './../../dialog/dialog-message/dialog-message.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {DialogGeneralConfirmationComponent} from './../../dialog/dialog-general-confirmation/dialog-general-confirmation.component'
import { LoaderService } from 'src/app/loaderService/loader.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  constructor( public auth: ConectionapiService, public loader: LoaderService, public _dialog: MatDialog ) { }

  headElements = [ 'Nombre', 'Correo', 'Role', 'Accion'];
  dataRole: any;
  roleData: any[] = [];

  ngOnInit(): void {
    this.loader.show();
    this.getCatalog();
    this.auth.service_general_get("User/All").subscribe(response => {
      // let respUser = response.result;
      console.log("user: ", response.result);
      this.dataRole = response.result;
      this.loader.hide();
    },(err)=>{
      console.log("Error: ", err);
      this.loader.hide();
    })   
  }
  getCatalog() {
    this.auth.service_general_get('Role/All').subscribe(resp => {
      if (resp.success) {
        this.roleData = resp.result;
        console.log('roles', this.roleData);
      }
    });
  }
  getRoleName(id: number) {
    for(let i = 0; i < this.roleData.length; i++){
      if(this.roleData[i].id == id){
         return this.roleData[i].role;
      }
    }
  }

  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
      this.dataRole.filter = filterValue.trim().toLowerCase();
  }
  deleteRole(id : number) {
    const dialogRef = this._dialog.open(DialogGeneralConfirmationComponent, {
      data: {
        header: "Confirmación para borrar",
        body: "¿Estas seguro de borrar este Rol?"
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == 'si') {
        this.auth.service_general_delete(`User?id=${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogMessageComponent, {
              data: {
                header: "Exito",
                body: 'El Rol se borro correctamente'
              },
            });
            this.ngOnInit();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogMessageComponent, {
            data: {
              header: "Atención",
              body: `Este Rol no se puede eliminar, por que esta en uso`
            },
            });
            this.ngOnInit();
        })
      }
    });
  }
  editRole(id : number) {
    console.log(id);
    console.log('abrir modal rol');
    const dialogRef = this._dialog.open(DialogAddRoleUserComponent, {
      data: {
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        const dialog = this._dialog.open(DialogMessageComponent, {
          data: {
            header: "Exito",
            body: "Se creo el Rol satisfactoriamente"
          },
          // width: "350px"
        });
        this.ngOnInit();
      }
      if(result === 2){
        const dialog2 = this._dialog.open(DialogMessageComponent, {
          data: {
            header: "Exito",
            body: "Se actualizo el Rol satisfactoriamente"
          },
          // width: "350px"
        });
        this.ngOnInit();
      }
      if (result === 3) {
        const dialog2 = this._dialog.open(DialogMessageComponent, {
          data: {
            header: "Error",
            body: "error"
          },
          // width: "350px"
        });
        this.ngOnInit();

      }
    })

  }

}

