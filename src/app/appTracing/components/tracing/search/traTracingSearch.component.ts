import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCustomerService } from 'src/app/appGeneral/services/genCustomer.service';
import { TraTracingService } from 'src/app/appTracing/services/traTracing.service';
import { TraFaseEntity } from "src/app/appTracing/entities/traFase.entity";
import { TraTracingModel } from "src/app/appTracing/models/traDetail.model";
import { TratimelineModel } from "src/app/appTracing/models/traTimeline.model";

@Component({
    selector: 'app-traTracingSearch',
    templateUrl: './traTracingSearch.component.html',
    styleUrls: ['./traTracingSearch.component.css']
})
export class TraTracingSearchComponent implements OnInit {
    loading1: boolean;
    loading2: boolean;
    loading3: boolean;
    customer: string;
    serial: string;
    customerList: GenCustomerEntity[];
    system:string;
    fase:string;
    wmsSap: boolean;
    wmsWoden:boolean;
    faseList: TraFaseEntity[];
    timelineList:TratimelineModel[];
    detail:TraTracingModel;

    constructor(private genCustomerS: GenCustomerService, private traTracingS: TraTracingService, private alertS: AlertService) {
        this.loading1 = false;
        this.loading2 = false;
        this.loading3 = false;
        this.customer = '';
        this.serial = '';
        this.customerList = [];
        this.system='';
        this.fase='';
        this.wmsSap=false;
        this.wmsWoden=false;
        this.faseList = [];
        this.timelineList=[];
        this.detail=new TraTracingModel();
    }
    ngOnInit() {
        this.genCustomerS.findAll().subscribe(res => {
            if (res.message === 'OK') {
                this.customerList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    selectCustomer(){
        this.wmsWoden=false;
        this.wmsSap=false;
        this.faseList=[];
        this.timelineList=[];
        this.detail=new TraTracingModel();
    }
    getSystem() {
        this.faseList = [];
        this.timelineList=[];
        this.detail=new TraTracingModel();
        this.wmsSap=false;
        this.wmsWoden=false;
        if (this.customer != '') {
            if (this.serial != '') {
                this.loading1=true;
                this.traTracingS.findSystem(Number(localStorage.getItem('countryId')),this.customer, this.serial).subscribe(res => {
                    if (res.message === 'OK') {
                        if(res.object!='|'){
                            if(res.object.split('|',2)[0]==='WMS WODEN'){
                                this.wmsWoden=true;
                            }
                            if(res.object.split('|',2)[1]==='WMS SAP'){
                                this.wmsSap=true;
                            }
                            this.loading1=false;
                        }else{
                            this.alertS.open('No existe informacion sobre el serial!','warning');
                            this.loading1=false;
                        }
                    } else {
                        this.alertS.open(res.message, 'error');
                        this.loading1=false;
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                    this.loading1=false;
                });
            } else {
                this.alertS.open('Ingrese un serial!', 'warning');
            }
        } else {
            this.alertS.open('Seleccione un cliente!', 'warning');
        }
    }
    getFase(system:string){
        this.system=system;
        this.faseList = [];
        this.detail=new TraTracingModel();
        this.loading2=true;
        this.traTracingS.findFase(Number(localStorage.getItem('countryId')),this.customer,system,this.serial).subscribe(res=>{
            if(res.message==='OK'){
                this.faseList=res.object;
                this.loading2=false;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
        this.loading2=true;
        this.traTracingS.findTimeline(Number(localStorage.getItem('countryId')),system,this.customer,this.serial).subscribe(res=>{
            if(res.message==='OK'){
                this.timelineList=res.object;
                this.loading2=false;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    getDetail(fase:string,serialId:number){
        this.fase=fase;
        this.detail=new TraTracingModel();
        this.loading3 = true;
        this.traTracingS.findDetail(Number(localStorage.getItem('countryId')),this.system,this.customer,fase,serialId).subscribe(res=>{
            if(res.message==='OK'){
                this.detail=res.object;
                this.loading3=false;
            }else{
                this.alertS.open(res.message,'error');
                this.loading3=false;
            }
        },err=>{
            this.alertS.open(err.message,'error');
            this.loading3=false;
        });
    }
}