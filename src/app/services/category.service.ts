import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Category } from '../models/categories/categories.model';
import { of } from 'rxjs'; 
import { debug } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  controllerName: string = "Category"
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public categories$: Observable<Category[]> = this.categoriesSubject.asObservable();

  constructor(private apiService: ApiService) { }

  loadCategories(): Observable<Category[]> {
    return this.apiService.get<Category[]>(this.controllerName).pipe(
      tap((data) => {
        this.categoriesSubject.next(data);
      }),
      catchError((error) => {
        console.error('Error loading Categories', error);
        return of([]); 
      })
    );
  }

  addCategory(Category: Category): Observable<Category> {
    return this.apiService.post<Category, Category>(this.controllerName, Category).pipe(
      tap((newCategory: Category) => {
        const currentCategories = this.categoriesSubject.getValue();
        this.categoriesSubject.next([...currentCategories, newCategory]);
      })
    );
  }


  deleteCategory(CategoryId: number): Observable<void> {
    return this.apiService.delete<void>(`${this.controllerName}/${CategoryId}`).pipe(
      tap(() => {
        const updatedCategories = this.categoriesSubject
          .getValue()
          .filter((Category: Category) => Category.id !== CategoryId);
        this.categoriesSubject.next(updatedCategories);
      })
    );
  }

  updateCategory(Category: Category): Observable<Category> {
    return this.apiService.put<Category, Category>(`${this.controllerName}/${Category.id}`, Category).pipe(
      tap((updatedCategory: Category) => {
        const currentCategories = this.categoriesSubject.getValue();
        const index = currentCategories.findIndex((p) => p.id === updatedCategory.id);
        currentCategories[index] = updatedCategory;
        this.categoriesSubject.next([...currentCategories]);
      })
    );
  }


}
