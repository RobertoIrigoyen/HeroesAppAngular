import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {
    constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) { }


    private checkOutStatus(): boolean | Observable<boolean> {
        return this.authService.checkAuthStatus()
            .pipe(
                tap(isAuthenticated => {
                    console.log('Auth: ', isAuthenticated);
                }),
                tap(isAuthenticated => {
                    if (!isAuthenticated) {
                        this.router.navigate(['./auth/login'])
                    }
                })

            )

    }
    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        /*   console.log('can match');
          console.log({ route, segments }); */
        return this.checkOutStatus();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        /*         console.log('can activate');
                console.log({ route, state }); */
        return this.checkOutStatus();
    }

}