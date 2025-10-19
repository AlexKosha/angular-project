import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-modal',
  imports: [MatButtonModule],
  templateUrl: './delete-confirmation-modal.html',
  styleUrl: './delete-confirmation-modal.scss',
})
export class DeleteConfirmationModal {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationModal>) {}

  cancel() {
    this.dialogRef.close(false);
  }

  deleteQuestion() {
    this.dialogRef.close(true);
  }
}
