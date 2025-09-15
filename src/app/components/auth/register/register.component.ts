import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { LottieAnimationComponent } from '../../lottie/lottie.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        LottieAnimationComponent,
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        TranslateModule
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    register: FormGroup;
    isSubmitting= false;
    errorMessage: string | null = null;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
        this.register = this.fb.group({
            name: ['', [Validators.required]],
            username: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
          });
    }

    get name() { return this.register.get('name'); }
    get surname() { return this.register.get('surname'); }
    get username() { return this.register.get('username'); }
    get email() { return this.register.get('email'); }  
    get password() { return this.register.get('password'); }

    onSubmit() {
        if (this.register.invalid) return;

        this.isSubmitting = true;
        this.errorMessage = null;
        this.authService.register(this.register.value)
            .subscribe(
                (res) => {
                    this.toastr.success("You signed up successfully")
                    this.router.navigate(['/home']);
                }
            )
        
    }

}
