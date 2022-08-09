import { Component, OnDestroy, OnInit } from "@angular/core";
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryCustomerService } from "src/app/appGeneral/services/genCountryCustomer.service";
import { InvCyclicLayoutModel } from "src/app/appInventory/models/invCyclicLayout.model";
import { InvCyclicService } from "src/app/appInventory/services/invCyclic.service";
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
    selector: 'app-invDashboardLayout',
    templateUrl: './invDashboardLayout.component.html',
    styleUrls: ['./invDashboardLayout.component.css']
})
export class InvDashboardLayoutComponent implements OnInit, OnDestroy {
    loading: boolean;
    system: string;
    customerId: string;
    customerList: GenCustomerEntity[];
    invCyclicLayoutModel: InvCyclicLayoutModel;
    interval: any;
    minutes: number;
    seconds: number;

    constructor(private genCountryCustomerS: GenCountryCustomerService, private invCyclicS: InvCyclicService, private alertS: AlertService) {
        this.minutes = 0;
        this.seconds = 0;
        this.loading = false;
        this.system = '';
        this.customerId = '';
        this.customerList = [];
        this.invCyclicLayoutModel = new InvCyclicLayoutModel();
        this.invCyclicLayoutModel.pallets = 0;
        this.invCyclicLayoutModel.serials = 0;
        this.invCyclicLayoutModel.accesories = 0;
        this.invCyclicLayoutModel.sapCodes = 0;
        this.invCyclicLayoutModel.locations = 0;
    }
    ngOnDestroy(): void {
        clearInterval(this.interval);
    }
    ngOnInit(): void { }

    getCustomer() {
        this.invCyclicLayoutModel.pallets = 0;
        this.invCyclicLayoutModel.serials = 0;
        this.invCyclicLayoutModel.accesories = 0;
        this.invCyclicLayoutModel.sapCodes = 0;
        this.invCyclicLayoutModel.locations = 0;
        clearInterval(this.interval);
        this.seconds = 59;
        this.minutes = 2;
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
    getLayout() {
        this.loading = true;
        this.invCyclicS.layout(this.system, this.customerId.split('_', 2)[1]).subscribe(res => {
            if (res.message === 'OK') {
                this.invCyclicLayoutModel = res.object;
                this.loading = false;
                if (this.interval != undefined) {
                    clearInterval(this.interval);
                    this.seconds = 59;
                    this.minutes = 2;
                }
                this.interval = setInterval(() => {
                    this.seconds = this.seconds - 1;
                    if (this.seconds === 0) {
                        this.minutes = this.minutes - 1;
                        this.seconds = 59;
                        if (this.minutes === -1) {
                            this.loading = true;
                            this.invCyclicS.layout(this.system, this.customerId.split('_', 2)[1]).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.invCyclicLayoutModel = res.object;
                                    this.loading = false;
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                            this.seconds = 59;
                            this.minutes = 2;
                        }
                    }
                }, 1000);
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}
