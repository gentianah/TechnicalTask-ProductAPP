import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { User } from "../models/user/user.model";
import { ApiService } from "./api.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  controllerName: string = "User"
  private usersSubject = new BehaviorSubject<User[]>([]);
  private userSubject = new BehaviorSubject<User | null>(null);
  public users$: Observable<User[]> = this.usersSubject.asObservable();
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private apiService: ApiService, private toastr: ToastrService) { }
  
  loadUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(this.controllerName).pipe(
      tap((data) => {
        this.usersSubject.next(data);
      }),
      catchError((error) => {
        console.error('Error loading Users', error);
        return of([]);
      })
    );
  }
  loadUser(id: string): Observable<User> {
    return this.apiService.get<User>(`${this.controllerName}/${id}`).pipe(
      tap((data) => this.userSubject.next(data)), 
      catchError((error) => {
        console.error('Error loading user', error);
        return of({} as User); 
      })
    );
  }
  
  updateUser(user: User): Observable<User> {
      return this.apiService.put<User, User>(`${this.controllerName}/${user.id}`,user).pipe(
          tap((updatedUser: User) => {
              this.usersSubject.next([updatedUser]);
          })
      );
  }

  deleteUser(userId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.controllerName}/${userId}`).pipe(
      tap(() => {
        const updatedUser = this.usersSubject
          .getValue()
          .filter((User: User) => User.id !== userId);
        this.usersSubject.next(updatedUser);
      })
    );
  }


}