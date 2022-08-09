import { Component } from "@angular/core";
import { PqrPqrsEntity } from 'src/app/appPqrs/entities/pqrPqrs.entity';
import { PqrPqrsService } from 'src/app/appPqrs/services/pqrPqrs.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrTracingEntity } from 'src/app/appPqrs/entities/pqrTracing.entity';
import { PqrTracingService } from 'src/app/appPqrs/services/pqrTracing.service';
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { PqrPqrsFileModel } from "src/app/appPqrs/models/pqrPqrsFile.model";
import { PqrCustomerService } from "src/app/appPqrs/services/pqrCustomer.service";
import { PqrsClientSerialModel } from "src/app/appPqrs/models/pqrClientSerial.model";

@Component({
    selector: 'app-pqrPqrsSearchCustomer',
    templateUrl: './pqrPqrsSearchCustomer.component.html',
    styleUrls: ['./pqrPqrsSearchCustomer.component.css']
})
export class PqrPqrsSearchCustomerComponent {
    loadingPqrs: boolean;
    loadingTracing: boolean;
    searchType: string;
    searchData: string;
    pqrsList: PqrPqrsEntity[];
    tracingList: PqrTracingEntity[];
    pqrPqrsEntity: PqrPqrsEntity;
    genPersonEntity: GenPersonEntity;
    fileStartList: PqrPqrsFileModel[];
    fileEndList: PqrPqrsFileModel[];
    fileList: PqrsClientSerialModel[];
    loading: boolean;

    constructor(private meeSupportS: PqrCustomerService, private pqrPqrsS: PqrPqrsService, private pqrTracingS: PqrTracingService, private alertS: AlertService) {
        this.loadingPqrs = false;
        this.loadingTracing = false;
        this.searchType = '';
        this.pqrsList = [];
        this.tracingList = [];
        this.fileStartList = [];
        this.fileEndList = [];
        this.fileList = [];
    }
    ngOnInit(): void {

        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));

    }
    search() {
        this.pqrPqrsEntity = null;
        this.tracingList = [];
        let identificationNumber: string;
        let ticket: string;
        let number: string;
        let serialImei: string;
        let name:string;
        let userId: number
        if (this.searchType === 'Numero de identificacion') {
            identificationNumber = this.searchData;
            ticket = '0';
            number = '0';
            serialImei = '0';
            name = '0'
            userId = this.genPersonEntity.id
        } else if (this.searchType === 'Numero de ticket') {
            identificationNumber = "0";
            ticket = this.searchData;
            number = '0';
            serialImei = '0';
            name = '0'
            userId = this.genPersonEntity.id
        } else if (this.searchType === 'Numero de PQRS') {
            identificationNumber = '0';
            ticket = '0';
            serialImei = '0';
            number = this.searchData;
            name = '0'
            userId = this.genPersonEntity.id
        } else if (this.searchType === 'Serial/Imei') {
            identificationNumber = '0';
            ticket = '0';
            number = '0';
            serialImei = this.searchData;
            name = '0'
            userId = this.genPersonEntity.id
        }   if (this.searchType === 'Nombre de cliente / solicitante') {
            identificationNumber = '0';
            ticket = '0';
            number = '0';
            serialImei = '0';
            name = this.searchData;
            userId = this.genPersonEntity.id
        }
        this.loadingPqrs = true;
        this.pqrPqrsS.findCustomer(this.genPersonEntity.id, identificationNumber, ticket, number, serialImei, name).subscribe(res => {
            if (res.message === 'OK') {
                this.loadingPqrs = false;
                this.pqrsList = res.object;
            } else {
                this.loadingPqrs = false;
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.loadingPqrs = false;
            this.alertS.open(err.message, 'error');
        });
    }
    tracing(number: string) {
        this.tracingList = [];
        this.loadingTracing = true;
        this.pqrTracingS.list(number).subscribe(res => {
            if (res.message === 'OK') {
                this.tracingList = res.object;
                this.loadingTracing = false;
            } else {
                this.alertS.open(res.message, 'error');
                this.loadingTracing = false;
            }
        }, err => {
            this.alertS.open(err.message, 'error');
            this.loadingTracing = false;
        });

    }
    detail(number: string, id: string, creationDate: string) {
        this.pqrPqrsS.findByNumber(number).subscribe(res => {
            if (res.message === 'OK') {
                this.pqrPqrsEntity = res.object;
                this.pqrPqrsS.listFile(number, 'INICIO').subscribe(resL => {
                    if (resL.message === 'OK') {
                        this.fileStartList = resL.object;                                               
                            this.meeSupportS.listFile(this.pqrPqrsEntity.filesId, this.pqrPqrsEntity.datefiles).subscribe(res => {
                               
                                if (res.message === 'OK') {
                                    this.fileList = res.object;
                                    this.loading = false;
                                } else {
                                    this.alertS.open(res.message, 'error');
                                    this.loading = false;
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                                this.loading = false;
                            });
                        
                    }
                    else {
                        this.alertS.open(resL.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
                this.pqrPqrsS.listFile(this.pqrPqrsEntity.number, 'FIN').subscribe(resL => {
                    if (resL.message === 'OK') {
                        this.fileEndList = resL.object;
                    } else {
                        this.alertS.open(resL.message, 'error');
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
    }
    downloadFile(file: PqrPqrsFileModel) {
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
            var blob = new Blob([bytes], { type: "application/" + file.type });
            downloadLink.href = window.URL.createObjectURL(blob);
        }
        downloadLink.setAttribute("download", file.name + '.' + file.type);
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}