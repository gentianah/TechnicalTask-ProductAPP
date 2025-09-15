import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../../models/products/products.model';
import { ProductService } from '../../../services/products.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService to show error messages
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/categories/categories.model';
import { MatSortModule, Sort } from '@angular/material/sort';
import { TranslateModule } from '@ngx-translate/core';
import { JwtService } from '../../../services/jwt.service';


@Component({
  selector: 'app-products',
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    MatSortModule,
    TranslateModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'status', 'category'];

  page: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  filterForm: FormGroup;
  defaultSortColumn: string = "Name";
  defaultSortDirection: string = "desc";
  userRole: string | null = null;

  constructor(private dialog: MatDialog, private productService: ProductService, private toastr: ToastrService, private fb: FormBuilder, private categoryService: CategoryService, private jwtService: JwtService) {
    this.products$ = this.productService.products$;
    this.categories$ = this.categoryService.categories$;
    this.productService.count$.subscribe(res => this.totalCount = res);
    this.filterForm = this.fb.group({
      name: [''],
      status: [''],
      categoryId: [null],
    });
  }

  ngOnInit() {
    this.getUserDetails()
    this.categoryService.loadCategories().subscribe();
    this.productService.loadProducts(this.page, this.pageSize, this.defaultSortColumn, this.defaultSortDirection, this.filterForm.value);
    this.filterForm.valueChanges.subscribe((res) => {
      this.page = 1;
      this.productService.loadProducts(this.page, this.pageSize, this.defaultSortColumn, this.defaultSortDirection, this.filterForm.value);
    });

  }
  getUserDetails(): void {
    const decodedToken = this.jwtService.decodeToken();
    if (decodedToken) {
      this.userRole = decodedToken.role;
      if (this.userRole === 'Admin') {
        this.displayedColumns.push('actions');
      }
    }
  }
  deleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: product
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.productService.loadProducts(this.page, this.pageSize, this.defaultSortColumn, this.defaultSortDirection, this.filterForm.value);
        this.toastr.success('Deleted Successfully')
      }
    });
  }

  editProduct(product: Product): void {
    debugger
    const dialogRef = this.dialog.open(EditComponent, {
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.productService.loadProducts(this.page, this.pageSize, this.defaultSortColumn, this.defaultSortDirection, this.filterForm.value);
        this.toastr.success('Updated Successfully')
      }
    });
  }

  onSortChange(event: Sort): void {
    this.defaultSortColumn = event.active.charAt(0).toUpperCase() + event.active.slice(1);;
    this.defaultSortDirection = event.direction;
    this.productService.loadProducts(this.page, this.pageSize, this.defaultSortColumn, this.defaultSortDirection, this.filterForm.value);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.productService.loadProducts(this.page, this.pageSize, this.defaultSortColumn, this.defaultSortDirection, this.filterForm.value);
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(CreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.productService.loadProducts(this.page, this.pageSize, this.defaultSortColumn, this.defaultSortDirection, this.filterForm.value);
        this.toastr.success('Added Successfully')
      }
    });
  }
  clearFilters(): void {
    this.filterForm.reset();
    this.page = 1;
  }
}