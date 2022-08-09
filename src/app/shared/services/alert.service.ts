import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    constructor(private toastrS: ToastrService) { }

    open(message: string, type: string) {
        switch (type) {
            case 'error':
                this.toastrS.error(message);
                break;
            case 'success':
                this.toastrS.success(message);
                break;
            case 'warning':
                this.toastrS.warning(message);
                break;
        }
    }
}