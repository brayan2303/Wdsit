import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonCountryService } from '../../services/genPersonCountry.service';

@Component({
    selector: 'modal-country',
    templateUrl: 'country.modal.html',
    styleUrls: ['./country.modal.css']
})
export class CountryModal {
    applicationList: number;
    columns: string[];
    dataSource: any[];
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private genPersonCountryS: GenPersonCountryService, private alertS: AlertService,
        public dialogRef: MatDialogRef<CountryModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['name', 'asignar'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.genPersonCountryS.list(this.data.personId).subscribe(res => {
            this.dataSource = res.object;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(): void {
        this.dialogRef.close(this.applicationList);
    }
    checked(input: HTMLInputElement, countryId: number) {
        if (input.checked) {
            this.genPersonCountryS.create(this.data.personId, countryId).subscribe(res => {
                this.genPersonCountryS.list(this.data.personId).subscribe(res => {
                    this.dataSource = res.object;
                    this.table.renderRows();
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.genPersonCountryS.delete(this.data.personId, countryId).subscribe(res => {
                this.genPersonCountryS.list(this.data.personId).subscribe(res => {
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