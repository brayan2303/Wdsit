import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { PqrCustomerService } from "src/app/appPqrs/services/pqrCustomer.service";
import { PqrCustomerEditComponent } from "../edit/pqrCustomerEdit.component";
import { PqrCustomerEntity } from "src/app/appPqrs/entities/pqrCustomer.entity";
import { PqrPqrsService } from "src/app/appPqrs/services/pqrPqrs.service";
import { PqrTracingService } from "src/app/appPqrs/services/pqrTracing.service";
import { PqrPqrsEntity } from "src/app/appPqrs/entities/pqrPqrs.entity";
import { PqrTracingEntity } from "src/app/appPqrs/entities/pqrTracing.entity";
import { PqrFileCustomerModal } from "src/app/appPqrs/modals/pqrFileCustomer/pqrFileCustomer.modal";
import { PqrPqrsFileModel } from "src/app/appPqrs/models/pqrPqrsFile.model";
import { PqrsClientSerialModel } from "src/app/appPqrs/models/pqrClientSerial.model";


@Component({
    selector: 'app-pqrCustomerList',
    templateUrl: './pqrCustomerList.component.html',
    styleUrls: ['./pqrCustomerList.component.css']
})

export class PqrCustomerListComponent implements OnInit {
    dataResponse: MatTableDataSource<any>;
    columnsResponse: string[];
    loadingResponse: boolean;
    @ViewChild('paginatorResponse') paginatorResponse: MatPaginator;
    loading: boolean;
    columns: string[];
    id:number;  
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    unibytes: Uint8Array = null;
    pqrEntintyCustomer: PqrCustomerEntity
    pqrList:PqrCustomerEntity[]
    form: any;
    loadingPqrs:boolean;
    loadingTracing:boolean;
    searchType: string;
    searchData: string;
    pqrsList: PqrPqrsEntity[];
    tracingList: PqrTracingEntity[];
    pqrPqrsEntity:PqrPqrsEntity;
    genPersonEntity
    fileStartList: PqrPqrsFileModel[];
    fileList: PqrsClientSerialModel[];
    fileEndList: PqrPqrsFileModel[];
    pqrCustomerEntity:PqrCustomerEntity;
    ticketId:string;
    constructor(private meeSupportS: PqrCustomerService,private pqrPqrsS: PqrPqrsService, private pqrTracingS: PqrTracingService, private pqrCustomerS: PqrCustomerService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;   
        this.columns = ['name', 'ticketId','description','Acciones'];
        this.columnsResponse = ['name','description'];
        this.dataSource = new MatTableDataSource([]);
        this.dataResponse = new MatTableDataSource([]);
        this.loadingResponse = false;
        this.pqrsList= [];
        this.loadingPqrs=false;
        this.loadingTracing=false;
        this.searchType = '';
        this.tracingList = [];
        this.fileStartList = [];
        this.fileEndList= [];
        this.fileList = [];
        this.pqrCustomerEntity = new PqrCustomerEntity();
        this.ticketId = '';
    
    }

    ngOnInit(): void {
        this.loading = true,
            this.search();
            this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
    }

    search(){
        this.pqrCustomerS.list((JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    edit(value: number) {
        const dialogRef = this.dialog.open(PqrCustomerEditComponent, {
            data: { pqrCustformId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.pqrCustomerS.list((JSON.parse(localStorage.getItem("user"))["id"])).subscribe(resL => {
                if (resL.message === 'OK') {
                    this.loading = false;
                    this.dataSource = new MatTableDataSource<any>(resL.object);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                } else {
                    this.alertS.open(resL.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    delete(value:number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.pqrCustomerS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.pqrCustomerS.list((JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res => {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                            }, err => {
                                this.alertS.open(err, 'error');
                            });
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    getInformation(ticketId:string, id:string){
        this.getResponse(id);
        this.details(ticketId);
        
    }

    getResponse(id:string){
        this.pqrsList=[];
        this.pqrPqrsEntity = null;
        this.tracingList = [];       
        this.loadingResponse=true;
        this.pqrCustomerS.listAll(id, this.genPersonEntity.id).subscribe(res=>{
            if(res.message==='OK'){
                this.dataResponse=new MatTableDataSource(res.object);
                this.dataResponse.paginator=this.paginatorResponse;
                this.dataResponse.sort= this.sort;
                this.loadingResponse=false;
                this.dataResponse.disconnect
            }else{
                this.loadingResponse=false;
            }
        },err=>{
            
            this.loadingResponse=false;
        });
    }
    details(id:string) {
        this.pqrsList=[];
        this.pqrPqrsEntity = null;
        this.tracingList = [];
        this.loading = true;
        this.pqrCustomerS.allDescription(id, this.genPersonEntity.id).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.pqrsList = res.object
            } else {
            }
        }, err => {
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
    detail(number:string, id:string, creationDate:string){
        this.pqrPqrsS.findByNumber(number).subscribe(res=>{
            if(res.message==='OK'){
                this.pqrPqrsEntity=res.object;
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
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
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
            var blob = new Blob([bytes], { type: "application/" + file.type});
            downloadLink.href = window.URL.createObjectURL(blob);
        }
        downloadLink.setAttribute("download", file.name+'.'+file.type);
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    getFiles(id:number, creationDate:string) {
        this.dialog.open(PqrFileCustomerModal, {
            data: {id:id, creationDate:creationDate },
            width: '100%'
        });
      }

      getFilesS(id:string, creationDate:string) {
        this.loading = true;
        this.meeSupportS.listFile(id,creationDate).subscribe(res => {
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
    
getinformation(number:string, id:string, creationDate:string){
    this.detail(number,id,creationDate);
}

    getticket(ticket:string){
        this.pqrCustomerS.findById(ticket).subscribe(resL =>{
            if(resL.message === 'OK'){
              this.pqrCustomerEntity = resL.object;
            }else{
                this.alertS.open(resL.message, '');
            }
        },err =>{
            this.alertS.open(err.message, 'error');
        })
    }
    
}