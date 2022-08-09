import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenCountryCustomerService } from '../../services/genCountryCustomer.service';

@Component({
    selector: 'modal-countryCustomer',
    templateUrl: 'countryCustomer.modal.html',
    styleUrls: ['./countryCustomer.modal.css']
})
export class CountryCustomerModal {
    columns: string[];
    dataSource: MatTableDataSource<any>;

    constructor(private genCountryCustomerS: GenCountryCustomerService, private alertS: AlertService,
        public dialogRef: MatDialogRef<CountryCustomerModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['name', 'asignar'];
        this.dataSource =new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.genCountryCustomerS.list(this.data.countryId).subscribe(res => {
            this.dataSource = res.object;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(): void {
        this.dialogRef.close();
    }
    checked(input: HTMLInputElement, customerId: number) {
        if (input.checked) {
            this.genCountryCustomerS.create(this.data.countryId, customerId).subscribe(res => {
                console.log(this.data.countryId, customerId)
                this.genCountryCustomerS.list(this.data.countryId).subscribe(res => {
                    this.dataSource = new MatTableDataSource(res.object);
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.genCountryCustomerS.delete(this.data.countryId, customerId).subscribe(res => {
                this.genCountryCustomerS.list(this.data.countryId).subscribe(res => {
                    this.dataSource = new MatTableDataSource(res.object);
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
}