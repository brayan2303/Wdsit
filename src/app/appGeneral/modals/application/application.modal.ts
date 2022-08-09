import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenApplicationService } from 'src/app/appGeneral/services/genApplication.service';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'modal-application',
    templateUrl: 'application.modal.html',
    styleUrls: ['./application.modal.css']
})
export class ApplicationModal {
    applicationList: number;
    columns: string[];
    dataSource: any[];
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private genApplicationS: GenApplicationService, private alertS: AlertService,
        public dialogRef: MatDialogRef<ApplicationModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['name', 'asignar'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.genApplicationS.findAll(this.data.personId).subscribe(res => {
            this.dataSource = res.object;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(): void {
        this.dialogRef.close(this.applicationList);
    }
    checked(input: HTMLInputElement, applicationId: number) {
        if (input.checked) {
            this.genApplicationS.add(this.data.personId, applicationId).subscribe(res => {
                this.genApplicationS.findAll(this.data.personId).subscribe(res => {
                    this.dataSource = res.object;
                    this.table.renderRows();
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.genApplicationS.remove(this.data.personId, applicationId).subscribe(res => {
                this.genApplicationS.findAll(this.data.personId).subscribe(res => {
                    this.dataSource = res.object;
                    this.table.renderRows();
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
}