import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss']
})
export class DialogMessageComponent implements OnInit {

  public header:string = "";
  public body:string = "";

  constructor(
      public dialogRef: MatDialogRef<DialogMessageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {

      this.header = this.data.header;
      this.body = this.data.body;

  }

}

export interface DialogData {
  header: string;
  body: string;
}
