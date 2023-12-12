import { Injectable } from '@angular/core';
import { CanMatch, CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch, CanActivate {
    constructor(private authService: AuthService, private router: Router) { }


    private checkOutStatus(): boolean | Observable<boolean> {
        return this.authService.checkAuthStatus()
            .pipe(
                tap(isAuthenticated => {
                    console.log('Auth: ', isAuthenticated);
                }),
                tap(isAuthenticated => {
                    if (isAuthenticated) {
                        this.router.navigate(['./'])
                    }
                }),
                map(isAuthenticated => !isAuthenticated)

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