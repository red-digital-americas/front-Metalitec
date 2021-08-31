import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-general-confirmation',
  templateUrl: './dialog-general-confirmation.component.html',
  styleUrls: ['./dialog-general-confirmation.component.scss']
})
export class DialogGeneralConfirmationComponent implements OnInit {

  public header!:string;
  public body!: string;

  constructor(public dialogRef: MatDialogRef<DialogGeneralConfirmationComponent>,
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
  
  
