import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<boolean> | Promise<boolean> | boolean{
        if(this.authService.isAuthenticated()){
            return true;
        }
        else{
            this.router.navigate(['/login'])
            return false;
        }
    }
}
// CanActivate: An interface that determines if a route can be activated.
// ActivatedRouteSnapshot & RouterStateSnapshot: Provide information about the route being accessed.
// Router: Allows navigation to different routes.
// AuthService: A custom authentication service that checks if a user is authenticated.
// Injectable: Makes the service available for dependency injection.
// Observable: Allows handling asynchronous operations