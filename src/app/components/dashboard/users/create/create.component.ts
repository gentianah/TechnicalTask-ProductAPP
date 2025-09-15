import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { User } from '../../../../models/user/user.model';
import { AuthService } from '../../../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
    selector: 'app-add',
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
        CommonModule,
        TranslateModule
    ],
    templateUrl: './create.component.html',
    styleUrl: './create.component.css'
})
export class CreateComponent {
    userForm: FormGroup;


    constructor(private fb: FormBuilder, private authService: AuthService, public dialogRef: MatDialogRef<CreateComponent>,) {
        this.userForm = this.fb.group({
            name: ['', [Validators.required]],
            username: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    get name() { return this.userForm.get('name'); }
    get surname() { return this.userForm.get('surname'); }
    get username() { return this.userForm.get('username'); }
    get email() { return this.userForm.get('email'); }
    get password() { return this.userForm.get('password'); }

    onSubmit(): void {
        if (this.userForm.invalid) {
            return;
        }
        const userData: User = this.userForm.value;

        this.authService.register(userData).pipe(
            tap((res) => {
                this.dialogRef.close('success');
            })
        ).subscribe()
    }

    onCancel(): void {
        this.dialogRef.close();
    }

}
