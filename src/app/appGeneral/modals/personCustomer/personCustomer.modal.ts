import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenCountryEntity } from "../../entities/genCountry.entity";
import { GenPersonCountryService } from "../../services/genPersonCountry.service";
import { GenPersonCustomerService } from "../../services/genPersonCustomer.service";

@Component({
    selector: 'modal-personCustomer',
    templateUrl: 'personCustomer.modal.html',
    styleUrls: ['./personCustomer.modal.css']
})
export class PersonCustomerModal {
    loading:boolean;
    columns: string[];
    dataSource: MatTableDataSource<any>;
    @ViewChild('paginator')paginator:MatPaginator;
    countryId:number;
    countryList:GenCountryEntity[];

    constructor(private genPersonCountryS:GenPersonCountryService,private genPersonCustomerS: GenPersonCustomerService, private alertS: AlertService,
        public dialogRef: MatDialogRef<PersonCustomerModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading=false;
        this.columns = ['name', 'asignar'];
        this.dataSource = new MatTableDataSource([]);
        this.countryId=0;
        this.countryList=[];
    }
    ngOnInit(): void {
        this.genPersonCountryS.listCountry(this.data.personId,).subscribe(res => {
            this.countryList=res.object;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(): void {
        this.dialogRef.close();
    }
    getCustomer(){
        this.loading=true;
        this.genPersonCustomerS.list(this.data.personId,this.countryId).subscribe(res=>{
            if(res.message==='OK'){
                this.dataSource=new MatTableDataSource(res.object);
                this.dataSource.paginator=this.paginator;
                this.loading=false;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    checked(input: HTMLInputElement, customerId: number) {
        if (input.checked) {
            this.genPersonCustomerS.create(this.data.personId,customerId).subscribe(res => {
                this.getCustomer();
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.genPersonCustomerS.delete(this.data.personId, customerId).subscribe(res => {
                this.getCustomer();
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
}