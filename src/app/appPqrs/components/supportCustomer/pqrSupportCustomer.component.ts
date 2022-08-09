import { Component, OnInit} from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrFilesCategoryService } from "src/app/appPqrs/services/pqrFilesCategory.service";
import { PqrFilesService } from "src/app/appPqrs/services/pqrFiles.service";
import { PqrFilesCategoryEntity } from "src/app/appPqrs/entities/pqrFilesCategory.entity";
import { PqrFilesEntity } from "src/app/appPqrs/entities/pqrFiles.entity";
import { PqrFilesModel } from "src/app/appPqrs/models/pqrFiles.model";



@Component({
    selector: 'app-pqrSupportCustomer',
    templateUrl: './pqrSupportCustomer.component.html',
    styleUrls: ['./pqrSupportCustomer.component.css']
})

export class pqrSupportCustomerComponent implements OnInit {
    loading: boolean;
    columns: string[];
    id:number;
    name: string;  
    loadingPqrs:boolean;
    loadingTracing:boolean;
    pqrsList: PqrFilesCategoryEntity[];
    tracingList: PqrFilesEntity[];
    pqrFilesEntity:PqrFilesEntity;
    loadingDay: boolean;
    fileListStart: PqrFilesModel[];
    countryIdLocal:string;
    constructor(private PqrFilesS:PqrFilesService,private pqrFilesCategoryS: PqrFilesCategoryService, private alertS: AlertService) {
        this.loading = false;   
        this.pqrsList= [];
        this.loadingPqrs=false;
        this.tracingList = [];
        this.name='';
        this.pqrFilesEntity= new PqrFilesEntity();
        this.countryIdLocal = '';
    }

    ngOnInit(): void {
        this.loading = true,
            this.search();
            this.countryIdLocal=localStorage.getItem('countryId');
            
    }

    search(){
        this.pqrsList= [];
        this.loading=true;
        this.pqrFilesCategoryS.list('Agente',Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.pqrsList=res.object;

                this.loading = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    tracing(name: string) {
        this.name=name;
        this.tracingList=[];
        this.loadingPqrs=true;
        this.PqrFilesS.findAllCustomer(name,Number(this.countryIdLocal)).subscribe(res => {
            if (res.message === 'OK') {
                this.tracingList=res.object;
                this.pqrFilesEntity=res.object;
                this.tracingList.map(vars =>{
                    this.file(vars.name) 
                })       
                this.loadingPqrs=false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    file(name:string){
    this.loadingDay = true;
        this.PqrFilesS.listFile(name).subscribe(res => {

            if (res.message === 'OK') {
                this.fileListStart = res.object;
                this.loadingDay = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });

    }
    download(file: PqrFilesModel) {
        var downloadLink = document.createElement("a");
        if (file.type === 'imagen') {
            downloadLink.setAttribute("href", "data:image/png;base64," + file.file);
        } else {
            var binary = window.atob(file.file);
            var binaryLength = binary.length;
            var bytes = new Uint8Array(binaryLength);
            for (var i = 0; i < binaryLength; i++) {
                var ascii = binary.charCodeAt(i);
                bytes[i] = ascii;
            }
            var blob = new Blob([bytes], { type: "application/" + file.type});
            downloadLink.href = window.URL.createObjectURL(blob);
        }
        downloadLink.setAttribute("download", file.name+'.'+file.type);
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    
}