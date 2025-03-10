import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-message',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './dialog-message.component.html',
  styleUrl: './dialog-message.component.css'
})
export class DialogMessageComponent {

  public estatus: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogMessageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.estatus = data.estatus == 'success' ? true : false;
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
