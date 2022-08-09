import { Injectable} from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { GenPersonService } from '../../appGeneral/services/genPerson.service';
import { Observable } from 'rxjs';
import { AutoLogoutService } from "./autTime.service";

@Injectable({
    providedIn:'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private genPersonService: GenPersonService, private router: Router,private autoLogout: AutoLogoutService) { }
    
    canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
   
        this.autoLogout.check();
        this.autoLogout.initListener();
        this.autoLogout.initInterval();

        if (this.genPersonService.authenticated()) {
            return true;
        }
        this.router.navigate(['/login']);
        //sessionStorage.clear();
        return false;
       
    }
    
}