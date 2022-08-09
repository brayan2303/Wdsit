import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { PasswordModal } from "src/app/appGeneral/modals/password/password.modal";

@Component({
    selector: 'app-dataBasesinit',
    templateUrl: './dataBasesinit.component.html',
    styleUrls: ['./dataBasesinit.component.css']
})

export class DataBasesinitComponent implements OnInit {


    constructor(private route: Router, private dialog: MatDialog, private alertS: AlertService) {
    }
    ngOnInit(): void {
        this.openDialogUser()
    }

    openDialogUser() {
        this.dialog.open(PasswordModal, {}).afterClosed().subscribe(res => {
            if (res != null) {
                this.route.navigate(['/principal/dataBases/list']);
            } else {
                this.alertS.open(res.message, 'error');
            }
        });
    }


}