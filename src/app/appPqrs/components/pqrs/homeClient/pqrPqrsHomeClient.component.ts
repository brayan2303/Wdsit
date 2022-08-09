import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PqrFormLawEntity } from "src/app/appPqrs/entities/PqrFormLaw.entity";
import { pqrFormLawService } from "src/app/appPqrs/services/pqrFormLaw.service";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
    selector: 'app-pqrPqrsHomeClient',
    templateUrl: './pqrPqrsHomeClient.component.html',
    styleUrls: ['./pqrPqrsHomeClient.component.css']
})
export class PqrPqrsHomeClientComponent implements OnInit {

    pqrFormLawEntity:PqrFormLawEntity;
    constructor( private dialog: MatDialog, private alertS: AlertService, private pqrFormLawS:pqrFormLawService) {
        this.pqrFormLawEntity = new PqrFormLawEntity();
        
    }

    ngOnInit(): void {
      this.search();
            
    }

    search(){
        this.pqrFormLawS.findByUserId((JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res => {
            if (res.message === 'OK') {
               this.pqrFormLawEntity = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
   
}