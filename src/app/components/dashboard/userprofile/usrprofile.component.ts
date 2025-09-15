import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user.model';
import { UserService } from '../../../services/user.sevice';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtService } from '../../../services/jwt.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-navbar',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonModule
    ],
    templateUrl: './usrprofile.component.html',
    styleUrls: ['./usrprofile.component.css'],
})
export class UsrProfileComponent implements OnInit {
    userProfileForm!: FormGroup;
    userId: string | null = null;
    username: string | null = null;
    user: User | null = null;
    isFormDisabled = true;

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private jwtService: JwtService,
    ) { }

    ngOnInit(): void {
        const decodedToken = this.jwtService.decodeToken();
        
        if (decodedToken) {
            this.userId = decodedToken.sub;
            this.username = decodedToken.username; 
        }
    
        this.userProfileForm = this.fb.group({
            id: [{ value: this.userId, disabled: this.isFormDisabled }, Validators.required],
            fullName: [{ value: '', disabled: this.isFormDisabled }, Validators.required],
            username: [{ value: this.username, disabled: this.isFormDisabled }, Validators.required],
            email: [{ value: '', disabled: this.isFormDisabled }, Validators.required],
        });
    
        if (this.userId) {
            this.getCurrentUser(this.userId);
        }
    }
    
    getCurrentUser(id: string): void {
        this.userService.loadUser(id).subscribe(
            (user) => {
                if (user) {
                    this.userProfileForm.patchValue({
                        id: this.userId,
                        username: this.username, 
                        fullName: user.fullName,
                        email: user.email
                    });
                }
            },
            (error) => {
                console.error("Error fetching user:", error);
            }
        );
    }
    onSubmit(): void {
        debugger
        if (this.userProfileForm.valid) {
            this.userService.updateUser(this.userProfileForm.value).subscribe({
                next: (data) => {
                    this.isFormDisabled = true;
                    this.userProfileForm.controls['fullName'].disable();
                    this.userProfileForm.controls['email'].disable();
            
                    this.toastr.success('User updated successfully');
                    
                },
                error: (err) => {
                    this.toastr.error('Error updating user data');
                }
            });
        }
    }
    onChangeAccountInfo(): void {
        this.isFormDisabled = false;
        this.userProfileForm.controls['fullName'].enable();
        this.userProfileForm.controls['email'].enable();
        this.userProfileForm.controls['username'].enable();
        this.userProfileForm.controls['id'].enable();

    }
}
