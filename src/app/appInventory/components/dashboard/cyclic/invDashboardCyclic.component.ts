import { Component, OnInit } from "@angular/core";
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryCustomerService } from "src/app/appGeneral/services/genCountryCustomer.service";
import { InvCyclicEntity } from 'src/app/appInventory/entities/invCyclic.entity';
import { InvCyclicService } from 'src/app/appInventory/services/invCyclic.service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
    selector: 'app-invDashboardCyclic',
    templateUrl: './invDashboardCyclic.component.html',
    styleUrls: ['./invDashboardCyclic.component.css']
})
export class InvDashboardCyclicComponent implements OnInit {
    loadingTotalPallets: boolean;
    loadingTotalSerials: boolean;
    loadingTotalAccesories: boolean;
    loadingSamplingPallets: boolean;
    loadingSamplingSerials: boolean;
    loadingSamplingAccesories: boolean;
    loadingAudited: boolean;
    loadingNoAudited: boolean;
    loadingPercentage: boolean;
    customerId: number;
    cyclicId: number;
    totalPallets: number;
    totalSerials: number;
    totalAccesories: number;
    samplingPallets: number;
    samplingSerials: number;
    samplingAccesories: number;
    differencePallets: number;
    differenceSerials: number;
    differenceAccesories: number;
    audited: number;
    noAudited: number;
    percentage: string;
    customerList: GenCustomerEntity[];
    cyclicList: InvCyclicEntity[];
    porcentajeTigo: number;
    porcentajeIq09: number;

    constructor(private invCyclicS: InvCyclicService, private genCountryCustomerS: GenCountryCustomerService, private alertS: AlertService) {
        this.loadingTotalPallets = false;
        this.loadingTotalSerials = false;
        this.loadingTotalAccesories = false;
        this.loadingSamplingPallets = false;
        this.loadingSamplingSerials = false;
        this.loadingSamplingAccesories = false;
        this.loadingAudited = false;
        this.loadingNoAudited = false;
        this.loadingPercentage = false;
        this.customerId = 0;
        this.cyclicId = 0;
        this.totalPallets = 0;
        this.totalSerials = 0;
        this.totalAccesories = 0;
        this.samplingPallets = 0;
        this.samplingSerials = 0;
        this.samplingAccesories = 0;
        this.differencePallets = 0;
        this.differenceSerials = 0;
        this.differenceAccesories = 0;
        this.audited = 0;
        this.noAudited = 0;
        this.percentage = '0';
        this.customerList = [];
        this.cyclicList = [];
        this.porcentajeTigo = 0;
        this.porcentajeIq09 = 0;
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
        this.totalPallets = 0;
        this.totalSerials = 0;
        this.totalAccesories = 0;
        this.samplingPallets = 0;
        this.samplingSerials = 0;
        this.samplingAccesories = 0;
        this.audited = 0;
        this.noAudited = 0;
        this.percentage = '0';
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
    search() {
        if (this.cyclicId != 0) {
            /*this.loadingTotalPallets = true;
            this.invCyclicS.totalPallets(this.cyclicId).subscribe(res => {
                if (res.message === 'OK') {
                    this.totalPallets = res.object;
                    this.loadingTotalPallets = false;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.loadingTotalSerials = true;
            this.invCyclicS.totalSerials(this.cyclicId).subscribe(res => {
                if (res.message === 'OK') {
                    this.totalSerials = res.object;
                    this.loadingTotalSerials = false;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.loadingTotalAccesories = true;
            this.invCyclicS.totalAccesories(this.cyclicId).subscribe(res => {
                if (res.message === 'OK') {
                    this.totalAccesories = res.object;
                    this.loadingTotalAccesories = false;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });*/
            this.loadingSamplingPallets = true;
            this.invCyclicS.samplingPallets(this.cyclicId).subscribe(res => {
                if (res.message === 'OK') {
                    this.samplingPallets = res.object;
                    this.loadingSamplingPallets = false;
                    this.loadingAudited = true;
                    this.invCyclicS.audited(this.cyclicId, 'Auditados').subscribe(res => {
                        if (res.message === 'OK') {
                            this.audited = res.object;
                            this.loadingAudited = false;
                            if (this.samplingPallets != 0) {
                                this.loadingPercentage = true;
                                this.percentage = ((this.audited / this.samplingPallets) * 100).toFixed(2);
                                this.loadingPercentage = false;
                            }
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.loadingSamplingAccesories = true;
            this.invCyclicS.samplingAccesories(this.cyclicId).subscribe(res => {
                if (res.message === 'OK') {
                    this.samplingAccesories = res.object;
                    this.loadingSamplingAccesories = false;
                    if (this.samplingAccesories != 0) {
                        this.differenceAccesories = Math.round((this.samplingAccesories * 100) / this.totalAccesories);
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.loadingSamplingSerials = true;
            this.invCyclicS.samplingSerials(this.cyclicId).subscribe(res => {
                if (res.message === 'OK') {
                    this.samplingSerials = res.object;
                    this.loadingSamplingSerials = false;
                    if (this.samplingSerials != 0) {
                        this.differenceSerials = Math.round((this.samplingSerials * 100) / this.totalSerials);
                        this.porcentajeTigo= (this.samplingSerials/49451) * 100
                        this.porcentajeIq09= (this.samplingSerials/47757) * 100

                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.loadingNoAudited = true;
            this.invCyclicS.audited(this.cyclicId, 'No Auditados').subscribe(res => {
                if (res.message === 'OK') {
                    this.noAudited = res.object;
                    this.loadingNoAudited = false;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('Seleccione un ciclico!', 'warning');
        }
    }
}
