import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActiveFixedEntity } from "../../entities/activeFixed.entity";
import { ActiveFixedService } from "../../services/activeFixed.service";

@Component({
    selector: 'modal-actProdSetail',
    templateUrl: 'actProdSetail.modal.html',
    styleUrls: ['./actProdSetail.modal.css']
})
export class ActDetailModal {
    loading: boolean;
    actFixedEntity: ActiveFixedEntity[];

    constructor(private activeFixedS:ActiveFixedService , private alertS: AlertService,
        public dialogRef: MatDialogRef<ActDetailModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.loading = false;
        this.actFixedEntity = [];
    }
    ngOnInit(): void {
        this.loading = true;
        this.activeFixedS.viewFeatures(this.data.productEquip).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.actFixedEntity = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}