import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { tap } from 'rxjs/operators';
import { User } from '../../../../models/user/user.model';
import { UserService } from '../../../../services/user.sevice';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-delete',
  imports: [
    MatButtonModule,
    MatDialogModule,
    TranslateModule
  ],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: User 
  ) {  }

onSubmit(): void {
  this.userService.deleteUser(this.data.id).pipe(
    tap((res) => {
      this.dialogRef.close('success');

    })
  ).subscribe();
}
  onCancel(): void {
    this.dialogRef.close();
  }
}