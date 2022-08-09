import { Component, Inject } from "@angular/core";
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent{
    constructor(public ref:MatSnackBarRef<AlertComponent>,@Inject(MAT_SNACK_BAR_DATA)public data:any){}

    close(){
        this.ref.dismiss();
    }
}