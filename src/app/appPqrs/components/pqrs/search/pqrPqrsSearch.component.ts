import { Component } from "@angular/core";
import { PqrPqrsEntity } from 'src/app/appPqrs/entities/pqrPqrs.entity';
import { PqrPqrsService } from 'src/app/appPqrs/services/pqrPqrs.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrTracingEntity } from 'src/app/appPqrs/entities/pqrTracing.entity';
import { PqrTracingService } from 'src/app/appPqrs/services/pqrTracing.service';

@Component({
    selector: 'app-pqrPqrsSearch',
    templateUrl: './pqrPqrsSearch.component.html',
    styleUrls: ['./pqrPqrsSearch.component.css']
})
export class PqrPqrsSearchComponent {
    loadingPqrs:boolean;
    loadingTracing:boolean;
    searchType: string;
    searchData: string;
    pqrsList: PqrPqrsEntity[];
    tracingList: PqrTracingEntity[];
    pqrPqrsEntity:PqrPqrsEntity;

    constructor(private pqrPqrsS: PqrPqrsService, private pqrTracingS: PqrTracingService, private alertS: AlertService) {
        this.loadingPqrs=false;
        this.loadingTracing=false;
        this.searchType = '';
        this.pqrsList = [];
        this.tracingList = [];
    }
    search() {
        this.tracingList=[];
        let identificationNumber: string;
        let ticket: string;
        let number:string;
        let serialImei:string;
        if (this.searchType === 'Numero de identificacion') {
            identificationNumber = this.searchData;
            ticket = '0';
            number='0';
            serialImei='0';
        } else if (this.searchType === 'Numero de ticket') {
            identificationNumber = "0";
            ticket = this.searchData;
            number='0';
            serialImei='0';
        }else if(this.searchType==='Numero de PQRS'){
            identificationNumber='0';
            ticket='0';
            serialImei='0';
            number=this.searchData;
        }else if(this.searchType==='Serial/Imei'){
            identificationNumber='0';
            ticket='0';
            number='0';
            serialImei=this.searchData;
        }
        this.loadingPqrs=true;
        this.pqrPqrsS.find(identificationNumber, ticket,number,serialImei,Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.loadingPqrs=false;
                this.pqrsList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    tracing(number: string) {
        this.tracingList=[];
        this.loadingTracing=true;
        this.pqrTracingS.list(number).subscribe(res => {
            if (res.message === 'OK') {
                this.tracingList=res.object;
                this.loadingTracing=false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    detail(number:string){
        this.pqrPqrsS.findByNumber(number).subscribe(res=>{
            if(res.message==='OK'){
                this.pqrPqrsEntity=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
}