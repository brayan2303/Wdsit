import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenCustomerEntity } from '../../entities/genCustomer.entity';
import { GenPersonCustomerService } from '../../services/genPersonCustomer.service';

@Component({
    selector: 'modal-customer',
    templateUrl: 'customer.modal.html'
})
export class CustomerModal implements OnInit {
    customerId:number;
    customerList: GenCustomerEntity[];

    constructor(private genPersonCustomerS: GenPersonCustomerService,private alertS:AlertService,
        public dialogRef: MatDialogRef<CustomerModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.customerId=0;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.genPersonCustomerS.listCustomer(this.data.personId,Number(localStorage.getItem('countryId'))).subscribe(res => {
            if(res.message==='OK'){
                this.customerList = res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        }, err => {
            this.alertS.open(err,'error');
        });
    }
    close(): void {
        this.dialogRef.close(this.customerId);
    }
}