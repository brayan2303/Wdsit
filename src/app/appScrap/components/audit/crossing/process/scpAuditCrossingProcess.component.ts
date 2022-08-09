import { Component, Inject, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { ScpAuditService } from "../../../services/scpAudit.service";
import { ScpAuditEntity } from "src/app/appScrap/entities/scpAudit.entity";
import { ScpAuditPalletService } from "../../../services/scpAuditPallet.service";
import { ScpAuditPalletEntity } from "src/app/appScrap/entities/scpAuditPallet.entity";
import { ScpCrossingAuditModel } from "src/app/appScrap/models/ScpCrossingAudit.model";
import { ScpAuditPreviousSerialService } from "../../../services/scpAuditPreviousSerial.service";
import { ScpCrossingWmsService } from "../../../services/scpCrossingWms.service";
import { ScpCrossingWdsitService } from "../../../services/scpCrossingWdsit.service";
import { ScpCrossingWdsitEntity } from "src/app/appScrap/entities/scpCrossingWdsit.entity"
import { MatDialog } from "@angular/material/dialog";
import { EndAuditComponent } from "src/app/appScrap/modals/end/endAudit.modal";
import { NoCrossingAudirtomponent } from "src/app/appScrap/modals/noCrossing/noCrossingAudirt.modal";

@Component({
    selector: 'app-scpAuditCrossingProcess',
    templateUrl: './scpAuditCrossingProcess.component.html',
    styleUrls: ['./scpAuditCrossingProcess.component.css']
})

export class ScpAuditCrossingProcessComponent implements OnInit {
    loading: boolean;
    loadingCroosing: boolean;
    columns: string[];
    columnsCrossing: string[];
    dataSourceCrossing = new MatTableDataSource<any>();
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatTable) tableCroosing: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatPaginator) paginatorCrossing: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatSort) sortCrossing: MatSort;
    unibytes: Uint8Array = null;
    ScpAuditE:ScpAuditEntity;
    ScpAuditPalletE:ScpAuditPalletEntity[];
    process:string;
    ScpCrossingAuditM:ScpCrossingAuditModel;
    scpCrossingWdsitEntity:ScpCrossingWdsitEntity;
    id:number;
    wdist:number;
    wms:number;
    public option:number
    customer:string;
    
    constructor(private dialog: MatDialog,private ScpCrossingWmsS:ScpCrossingWmsService,private scpCrossingWdsitS:ScpCrossingWdsitService,private scpCrossingWmsS:ScpCrossingWmsService,private ScpAuditS: ScpAuditService, private ScpAuditPalletS:ScpAuditPalletService, private alertS: AlertService, private ScpAuditPreviousSerialS: ScpAuditPreviousSerialService) {
        this.loading = false;
        this.process = '';
        this.columnsCrossing = ['wdsit', 'wms', 'wmsVsWdist', 'wdistVswms'];
        this.columns = ['codeAudit', 'customer','auditPreviousName', 'typeAuditName', 'state', 'levelRuleName', 'userName', 'active'];
        this.ScpAuditE = null;
        this.ScpAuditPalletE = [];
        this.ScpCrossingAuditM = new ScpCrossingAuditModel();
        this.ScpCrossingAuditM.wms = [];
        this.ScpCrossingAuditM.audit = [];
        this.dataSourceCrossing = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource([]);
        this.loadingCroosing = false
        this.id= 0;
        this.wdist=0;
        this.wms=0;
        this.customer = '';


    }

    ngOnInit(): void {
        this.loading = true,
        this.list();
    }

    list() {
        this.ScpAuditS.listForCrossing().subscribe(res => {
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

    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }

    }

    searchAudit(item:ScpAuditEntity){
        if(item.state === 'En auditoria')
        {
            this.alertS.open('Esta auditoria ya se encuentra validada!', 'warning');
        }else{ 
        this.ScpAuditPalletE = [];
        this.ScpAuditS.findById(item.id).subscribe(resP => {
            if (resP.message === 'OK') {
                this.ScpAuditE = resP.object;
                 this.customer = this.ScpAuditE.customer;
                this.process = '';
            } else {
                this.alertS.open(resP.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    }

    crossingPallet(){
        this.ScpCrossingAuditM.wms = [];
        this.ScpCrossingAuditM.audit = [];
        this.ScpAuditPalletS.findByAuditId(this.ScpAuditE.id).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.ScpAuditPalletE = res.object;
                this.confirmSerialsWMS(this.customer);
                this.process = 'Consultando Pallets !';
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        
    }

    confirmSerialsWMS(customer:string){
        this.ScpAuditPalletE.forEach(element => {
            this.ScpAuditPalletS.searchSerialsByPalletNumber(element.pallet,customer).subscribe(res => {
                if (res.message === 'OK') {
                    res.object.forEach(element => {
                        this.ScpCrossingAuditM.wms.push(element);
                        this.process = 'Consultando WMS !';      
                        var serial = element.serial;
                        var pallet = element.pallet;
                        var verfic=serial.replace(/['"]+/g, '')
                        this.ScpCrossingWmsS.create(verfic,pallet).subscribe(resE =>{
                            if(resE.message === 'OK'){
                                if(res.object !=0){
                                    this.confirmSerialsAudit();
                                    this.alertS.open('Registro creado!','success');
                                  }else{
                                    this.alertS.open(res.message,'error');
                                  }
                                
                            }else{  
                                this.alertS.open(resE.message,'error')
                            }
                        })
                    
                    });
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        })

    }

    confirmSerialsAudit(){
        this.ScpAuditPreviousSerialS.list(this.ScpAuditE.auditPreviousId).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    res.object.forEach(element => {
                        this.ScpCrossingAuditM.audit.push(element);
                        this.process = 'Consultando Aditoria Previa !';
                        this.crossingSerials(this.ScpAuditE.auditPreviousId);
                        
                    });
                }
            } else {
                this.alertS.open(res.object, 'warning');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
      
    }

    crossingSerials(id:number){
        this.id=id
        this.ScpCrossingWmsS.listCrossing(this.id).subscribe(resC =>{
          if(resC.message === 'OK'){
            this.process = 'Validando información encontrada y seleccionado seriales';
            this.loading = false;
            this.dataSourceCrossing = new MatTableDataSource<any>(resC.object);
            this.dataSourceCrossing.paginator = this.paginatorCrossing;
            this.dataSourceCrossing.sort = this.sortCrossing;
            this.process = 'Informacion lista!';
            this.count()
          }else{
              this.alertS.open(resC.message,'error');
          }

        },err => {
            this.alertS.open(err.message, 'error');
        }); 
    }

    count(){
        this.scpCrossingWmsS.listCrossingCount(this.ScpAuditE.auditPreviousId).subscribe(resP =>{
            if(resP.message === 'OK'){
                var por = 100;
                 var wdist = resP.object.wdsit;
                 var total = resP.object.wmsVsWdist;
                 var sum =wdist/total;
                 var x = sum*por;
                 this.wdist=x;

                 var wms = resP.object.wms;
                 var total2 = resP.object.wmsVsWdist;
                 var sum2 =wms/total2;
                 var y = sum2*por;
                 this.wms=y; 
            }
        })
    }

    updateClose(id:number){
        this.ScpAuditS.updateClose(id).subscribe(resU =>{
             if(resU.message === 'OK'){
                 this.alertS.open('Auditoria cerrada', 'succes');
                 this.list() 
             }else{
                 this.alertS.open(resU.message, 'error');
             }

        }, err =>{
            this.alertS.open(err.message, 'error');
        });

    }

    getRegisSerial(id: number) {
        const dialogRef = this.dialog.open(EndAuditComponent, {
          data: { id: id },
          width: '100%'
        });
        dialogRef.afterClosed().subscribe(resA => {
          this.list();
        }, err => {
          this.alertS.open(err.message, 'error');
        });
      }
    
      getRegisResult(id: number) {
        const dialogRef = this.dialog.open(NoCrossingAudirtomponent, {
          data: { id: id },
          width: '100%'
        });
        dialogRef.afterClosed().subscribe(resA => {
          this.list();
        }, err => {
          this.alertS.open(err.message, 'error');
        });
      }
    

}