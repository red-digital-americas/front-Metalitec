import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConectionapiService } from 'src/app/authService/conectionapi.service';
import { AbstractControl, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
// import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/loaderService/loader.service';
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
  motherLastName: FormControl = new FormControl("", [Validators.required]);
  roleId: FormControl = new FormControl("", [Validators.required]);
  phone: FormControl = new FormControl("", [Validators.required]);
  mobilePhone: FormControl = new FormControl("", [Validators.required]);
  


  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ConectionapiService,
    public _dialog: MatDialog,
    private formBuilder: FormBuilder,
    public loader: LoaderService,
    public _routerParams: ActivatedRoute)
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
  // /api/Role/All
  ngOnInit(): void {
    this.loader.show();
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
    //   const dialogRef = this._dialog.open(DialogChangePasswordComponent, {
    //     data: {email: email},
    //     width: "50%",
    //   });
    //   dialogRef.afterClosed().subscribe(result => {
    //     if(result === 1){
    //       const dialog = this._dialog.open(DialogGeneralMessageComponent, {
    //         data: {
    //           header: "Success",
    //           body: "Change password"
    //         },
    //         width: "350px"
    //       });
    //       this.getCatalogos();
    //     }
    //     else if(result === 2){
    //       const dialog = this._dialog.open(DialogGeneralMessageComponent, {
    //         data: {
    //           header: "Error",
    //           body: "User incorrect"
    //         },
    //         width: "350px"
    //       });
    //       this.getCatalogos();
    //     }
    //     else{
    //       this.getCatalogos();
    //     }
    //   })
    // }

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
        this.data.createdBy = 1;
        this.data.createdDate = new Date();
        this.data.updatedBy = 1;
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
        this.data.updatedBy = 1;
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