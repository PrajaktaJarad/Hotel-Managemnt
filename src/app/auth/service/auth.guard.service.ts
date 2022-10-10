import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})

/*Here we are implementing CanActive interface as we have to add authenticate for user 
  if user has logged in then only allow user to go to access the reviews page.If user 
  has not logged in then redirect it to login page after successful login redirect again to home page.
*/ 
export class AuthGuard implements CanActivate{

     constructor(private router: Router){

     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //console.log('is can Activate..');//here we are checking that for accessing review page it is calling canActive or not 
       /*
         check if the User is LoggedIn or not?
         OAuth 2.0: api:username,password: token(128) : localStorage
         :api: token as a header
       */
      let token = localStorage.getItem('token');
      if(token){
          return true;
      }

       this.router.navigateByUrl("/login");
        return false;
    }

}