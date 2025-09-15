import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Metrics } from '../models/metrics/metrics.model';
import { combineLatest } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  productController: string = "Product";
  categoryController: string = "Category";
  userController: string = "User";

  constructor(private apiService: ApiService) { }

  getMetrics(): Observable<Metrics> {
    return new Observable<Metrics>((observer) => {
      const products$ = this.apiService.get<number>(`${this.productController}/count`).pipe(
        catchError(error => {
          console.error('Error retrieving total products:', error);
          return of(0);  
        })
      );

      const categories$ = this.apiService.get<number>(`${this.categoryController}/count`).pipe(
        catchError(error => {
          console.error('Error retrieving total categories:', error);
          return of(0); 
        })
      );

      const users$ = this.apiService.get<number>(`${this.userController}/count`).pipe(
        catchError(error => {
          console.error('Error retrieving total users:', error);
          return of(0);  
        })
      );

      combineLatest([products$, categories$, users$]).subscribe(
        ([totalProducts, totalCategories, totalUsers]) => {
          const metrics: Metrics = {
            totalProducts,
            totalCategories,
            totalUsers
          };
          observer.next(metrics);  
          observer.complete();
        },
        (error) => {
          observer.error(error); 
        }
      );
    });
  }
}
