import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/products.service';
import { Product } from '../../../../models/products/products.model';
import { Category } from '../../../../models/categories/categories.model';

@Component({
  selector: 'app-edit',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  productForm: FormGroup;
  category$: Observable<Category[]>;


  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: Product 
  ) {
    this.productForm = this.fb.group({
      id: ['', Validators.required],  
      name: ['', Validators.required],  
      price: [0, [Validators.required]],  
      quantity: ['', [Validators.required, Validators.min(1)]], 
      status: ['', Validators.required],  
      categoryId: ['', Validators.required], 
      category: [{id: 0, description: ''}], 
    });
    this.productForm.patchValue(this.data);
    this.category$ = this.categoryService.categories$;
  }

  ngOnInit() {
    this.categoryService.loadCategories().subscribe(categories => {
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const updatedProduct: Product = this.productForm.value;

    this.productService.updateProduct(updatedProduct).subscribe({
      next: () => this.dialogRef.close('success'),
      error: () => this.dialogRef.close('error'),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}