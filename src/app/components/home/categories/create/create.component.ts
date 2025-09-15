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
import { CategoryService } from '../../../../services/category.service';
import { tap } from 'rxjs/operators';
import { Category } from '../../../../models/categories/categories.model';
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
  categoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;  
    }
    const categoryData: Category = this.categoryForm.value;

    this.categoryService.addCategory(categoryData).pipe(
      tap((res) => {
        this.dialogRef.close('success');
      })
    ).subscribe()
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}