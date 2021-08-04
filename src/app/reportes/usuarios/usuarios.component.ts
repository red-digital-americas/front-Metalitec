import { Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ConectionapiService } from 'src/app/authService/conectionapi.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateUserComponent } from './../dialog/create-user/create-user.component';
import { DialogGeneralMessageComponent } from '../dialog/dialog-general-message/dialog-general-message.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralConfirmacionComponent } from '../dialog/general-confirmacion/general-confirmacion.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  // @ViewChild('sortuser') sortuser: MatSort;
  // @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // @ViewChild(MatPaginator) paguser: MatPaginator;
  search: any;

  constructor(public auth: ConectionapiService, public loader: AppComponent, public _dialog: MatDialog) { }

  headElements = [ 'Nombre', 'Correo', 'Role', 'Accion'];
  dataUser: any;
  roleData: any[] = [];

 
  ngOnInit(): void {
    this.loader.show();
    this.getCatalog();
    this.auth.service_general_get("User/All").subscribe(response => {
      // let respUser = response.result;
      console.log("user: ", response.result);
      this.dataUser = response.result;
      
    },(err)=>{
      console.log("Error: ", err)
    })
    this.loader.hide();
    
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
      this.dataUser.filter = filterValue.trim().toLowerCase();
    
  }
  
  
  
  deleteUser(id : number) {
    const dialogRef = this._dialog.open(GeneralConfirmacionComponent, {
      data: {
        header: "Confirmación para borrar",
        body: "¿Estas seguro de borrar el usuario?"
      },
      // width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.auth.service_general_delete(`User?id=${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Exito",
                body: 'El Usuario se borro correctamente'
              },
              // width: "350px"
            });
            this.ngOnInit();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Atención",
              body: `El Usuario no se puede eliminar por que esta en uso`
            },
            // width: "350px"
            });
            this.ngOnInit();
        })
      }
    });
  }
  editUser(id : number) {
    console.log(id);
    console.log('abrir modal currencies');
    const dialogRef = this._dialog.open(CreateUserComponent, {
      data: {
        id: id,
      },
      // width: "30%",
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Exito",
            body: "Se creo el Usuario"
          },
          width: "350px"
        });
        this.ngOnInit();
      }
      if(result === 2){
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Exito",
            body: "Se actualizo el Usuario"
          },
          width: "350px"
        });
        this.ngOnInit();
      }
      if (result === 3) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "error"
          },
          width: "350px"
        });
        this.ngOnInit();

      }
    })

  }

}
