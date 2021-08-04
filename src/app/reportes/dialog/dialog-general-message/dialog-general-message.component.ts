import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-general-message',
  templateUrl: './dialog-general-message.component.html',
  styleUrls: ['./dialog-general-message.component.scss']
})
export class DialogGeneralMessageComponent implements OnInit {

  public header!:string;
  public body!: string;
  
  constructor( public dialogRef: MatDialogRef<DialogGeneralMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
    }

  ngOnInit(): void {
    this.header = this.data.header;
    this.body = this.data.body;
  }

}
export interface DialogData {
  header: string;
  body: string;
}
