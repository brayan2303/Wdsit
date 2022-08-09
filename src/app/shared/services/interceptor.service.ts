import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { GenPersonService } from "src/app/appGeneral/services/genPerson.service";
import { AlertService } from "./alert.service";

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
    constructor(private genPersonS: GenPersonService, private router: Router, private alertS: AlertService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var url = req.url;

        if (url.includes('WDSIT_API_IQ09') == true) {
            return next.handle(req);
        } else {
            const token = localStorage.getItem('token');
            if (!token) {
                return next.handle(req);
            }

            const headers = req.clone({
                headers: req.headers.set('Authorization', token)
            });
            return next.handle(headers).pipe(
                catchError((err: HttpErrorResponse) => {
                    if (err.status === 403 || err.status == 503 || err.status === 503) {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        localStorage.removeItem('customerId');
                        localStorage.removeItem('tokenSap');
                        localStorage.removeItem('countryId');
                        this.router.navigate([window.location.href = "/login"],
                        );
                    }
                    if (err.status === 500) {
                        this.alertS.open('Error en el servidor, ¡ Por favor verificar acciones !', 'warning')
                    }
                    else
                        return throwError(err)
                })
            );
        }
    }

}