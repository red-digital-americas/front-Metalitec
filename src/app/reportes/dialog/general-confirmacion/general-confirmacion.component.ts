import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-general-confirmacion',
  templateUrl: './general-confirmacion.component.html',
  styleUrls: ['./general-confirmacion.component.scss']
})
export class GeneralConfirmacionComponent implements OnInit {

  public header!:string;
  public body!: string;

  constructor(public dialogRef: MatDialogRef<GeneralConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.header = this.data.header;
    this.body = this.data.body;
  }
  
  yes(){
    this.dialogRef.close('si');
  }

  no(){
    this.dialogRef.close('no');
  }


}
export interface DialogData {
  header: string;
  body: string;
}

