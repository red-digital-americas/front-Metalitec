import { DialogGeneralMessageComponent } from './../dialog-general-message/dialog-general-message.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConectionapiService } from 'src/app/authService/conectionapi.service';
import { AbstractControl, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoaderService } from 'src/app/loaderService/loader.service';
import { DialogChangePasswordComponent } from '../dialog-change-password/dialog-change-password.component';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  // avatar": "string",
  validationForm: FormGroup;
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  // password: FormControl = new FormControl("", [Validators.required]);
  name: FormControl = new FormControl("", [Validators.required]);
  lastName: FormControl = new FormControl("", [Validators.required]);
  motherLastName: FormControl = new FormControl();
  roleId: FormControl = new FormControl("", [Validators.required]);
  phone: FormControl = new FormControl();
  mobilePhone: FormControl = new FormControl("", [Validators.required]);
  


  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ConectionapiService,
    public _dialog: MatDialog,
    private formBuilder: FormBuilder,
    public loader: LoaderService)
  {
    
    this.validationForm = this.formBuilder.group({
      email: this.email,
      // password: this.password,
      name: this.name,
      lastName: this.lastName,
      motherLastName: this.motherLastName,
      roleId: this.roleId,
      phone: this.phone,
      mobilePhone: this.mobilePhone,

    });
  }
  validar: boolean = false;
  roleData: any[] = [];
  public user: any;
  // /api/Role/All
  ngOnInit(): void {
    this.loader.show();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('data user log', this.user);

    this.getCatalog();
    console.log('Data que recibe user', this.data);
     if (this.data.id != 0) {
      this._services.service_general_get(`User/${this.data.id}`).subscribe(resp => {
        if (resp.success) {
          this.data = resp.result;
        }
      });
     }
     this.loader.hide();
  }
  getCatalog() {
    this._services.service_general_get('Role/All').subscribe(resp => {
      if (resp.success) {
        this.roleData = resp.result;
        console.log('roles', this.roleData);
      }
    });
  }
  changePassword(email: string) {
    console.log('change email', email);
      const dialogRef = this._dialog.open(DialogChangePasswordComponent, {
        data: {email: email},
        // width: "50%",
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result === 1){
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Exito",
              body: "Se cambio la contraseña satisfactoriamente"
            },
            // width: "350px"
          });
          this.ngOnInit();
        }
        else if(result === 2){
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Error",
              body: "Usuario incorrecto "
            },
            // width: "350px"
          });
          this.ngOnInit();
        }
        else{
          this.ngOnInit();
        }
      })
  }

  public emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


  // validaciones de correo 
  public validateEmail( email_in:string ):boolean {
    let result:boolean = true;
    const validating_email = this.emailPattern.test( email_in );
    if( !validating_email ) result = false;
    return result;
  }
  public validateEmailServerAvailability():void {
    if( this.data.email != '' ) {
      this._services.service_general_get(`User/Verify-Email?email=${ this.data.email }`)
      .subscribe( (response:any) => {
        console.log('Res => ', response);
        if (!response.success) {
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Este correo ya existe",
              body: "Por favor agrega otro correo"
            },
          });
          this.data.email = '';
        }
      });
    }
  }
  public removeErrorLabel( input_value:any, object_data:any ):void {
    if( input_value == "" || input_value == null ) {
      object_data.handler[object_data.field] = true;
    } else {
      object_data.handler[object_data.field] = false;
    }
  }
  public nso_ainfo_fields:any = {
    no_emai: false,
    no_emai_val: false,
  }
  public validEmailAssignee():void {
    !this.validateEmail( this.data.email ) ?
      this.nso_ainfo_fields.no_emai_val = true :
      this.nso_ainfo_fields.no_emai_val = false;
  }
  
  btnDisables = false;
  save() {
    console.log('antes de validacion', this.validationForm);
    if (this.validationForm.status == 'VALID') {
      this.validar = false;
      this.validationForm.disable();
      this.btnDisables = true;
      console.log('despues de validar');
      // create
      if (this.data.id == 0) {
        this.loader.show();
        this.data.createdBy = this.user.id;
        this.data.createdDate = new Date();
        this.data.updatedBy = this.user.id;
        this.data.updatedDate = new Date();
        this._services.service_general_post_with_url('User/New-User', this.data).subscribe(resp => {
          if (resp.success) {
            console.log('se creo con exito', resp);
            this.loader.hide();
            this.dialogRef.close(1);
          }
        }
          , (error) => {
          this.dialogRef.close(3);
        }
        );
      }
      else {
        this.loader.show();
        this.data.updatedBy = this.user.id;
        this.data.updatedDate = new Date();
        this._services.service_general_put('User/Edit-User', this.data).subscribe(resp => {
          if (resp.success) {
            console.log('se actualizo con exito', resp);
            this.loader.hide();
            this.dialogRef.close(2);
          }
        }, (error) => {
          this.dialogRef.close(3);
        });
      }
    }
    else {
      this.validar = true;
    }
  }
}
// export interface DialogData {
//   email: string,
//   password: string,
//   name: string,
//   lastName:string,
//   motherLastName: string,
//   roleId: number,
//   phone: string,
//   mobilePhone: string,
// }