import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import { Product } from '../../../../models/products/products.model';
import { ProductService } from '../../../../services/products.service';
import { Category } from '../../../../models/categories/categories.model';
import { CategoryService } from '../../../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
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
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  productForm: FormGroup;
  category$: Observable<Category[]>;

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],  
      price: [0, [Validators.required]],  
      quantity: ['', [Validators.required, Validators.min(1)]], 
      status: ['', Validators.required],  
      categoryId: ['', Validators.required], 
      category: [{id: 0, name: ''}], 
    });
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
    const productData: Product = this.productForm.value;

    this.productService.addProduct(productData).pipe(
      tap((res) => {
        this.toastr.success("Product created successfully")
        this.dialogRef.close('success');
      })
    ).subscribe()
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}