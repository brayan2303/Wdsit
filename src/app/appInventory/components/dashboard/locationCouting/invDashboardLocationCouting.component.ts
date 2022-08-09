import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryCustomerService } from "src/app/appGeneral/services/genCountryCustomer.service";
import { InvCyclicEntity } from 'src/app/appInventory/entities/invCyclic.entity';
import { InvLocationCoutingModel } from "src/app/appInventory/models/invLocationCouting.model";
import { InvCyclicService } from 'src/app/appInventory/services/invCyclic.service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
    selector: 'app-invDashboardLocationCouting',
    templateUrl: './invDashboardLocationCouting.component.html',
    styleUrls: ['./invDashboardLocationCouting.component.css']
})
export class InvDashboardLocationCoutingComponent implements OnInit {
    open: string = '';
    height: string;
    loadingLocation: boolean;
    loadingSapCode: boolean;
    customerId:number;
    cyclicId: number;
    customerList: GenCustomerEntity[];
    cyclicList: InvCyclicEntity[];
    locationList:InvLocationCoutingModel[];
    locationListSlice:InvLocationCoutingModel[];
    sapCodeList:InvLocationCoutingModel[];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private invCyclicS: InvCyclicService, private genCountryCustomerS: GenCountryCustomerService, private alertS: AlertService) {
        this.loadingLocation = false;
        this.loadingSapCode = false;
        this.customerId=0;
        this.cyclicId = 0;
        this.customerList = [];
        this.cyclicList = [];
        this.locationList=[];
        this.locationListSlice=[];
        this.sapCodeList=[];
    }
    ngOnInit(): void {
        this.genCountryCustomerS.listCustomer(Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.customerList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getCyclic() {
        this.invCyclicS.listByCustomerId(this.customerId).subscribe(res => {
            if (res.message === 'OK') {
                this.cyclicList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getLocation() {
        this.loadingLocation=true;
        this.invCyclicS.locationCouting(this.cyclicId).subscribe(res=>{
            if(res.message==='OK'){
                this.locationList=res.object;
                this.locationListSlice=this.locationList;
                this.paginator.pageIndex = 0;
                if (this.paginator.pageIndex === 0) {
                    this.locationListSlice = this.locationListSlice.slice(0, this.paginator.pageSize);
                } else {
                    this.locationListSlice = this.locationListSlice.slice((this.paginator.pageIndex * this.paginator.pageSize), (this.paginator.pageIndex * this.paginator.pageSize) + this.paginator.pageSize);
                }
                this.loadingLocation=false;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
        this.loadingSapCode=true;
        this.invCyclicS.sapCodeSerial(this.cyclicId).subscribe(res=>{
            if(res.message==='OK'){
                this.sapCodeList=res.object;
                this.loadingSapCode=false;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    onClick(value) {
        this.height = (document.getElementById('sapCode' + value).children.length * 60) + 'px';
        if (this.open === '' || this.open != value) {
            this.open = value;
        } else if (this.open === value) {
            this.open = '';
        }
    }
    change(e) {
        this.locationListSlice = this.locationList;
        if (e.pageIndex === 0) {
            this.locationListSlice = this.locationListSlice.slice(0, e.pageSize);
        } else {
            this.locationListSlice = this.locationListSlice.slice((e.pageIndex * e.pageSize), (e.pageIndex * e.pageSize) + e.pageSize);
        }
    }
}
