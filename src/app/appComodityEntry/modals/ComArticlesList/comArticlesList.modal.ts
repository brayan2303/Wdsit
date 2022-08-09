import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ComArticlesNewModal } from "../ComArticlesNew/comArticlesNew.modal";
import { ComCommodityPalletModel } from "../../models/comCommodityPalletModel";
import { ComCommoditySAPReturnModel } from "../../models/comCommodirySapReturnModel";
import { ComCommodityEntryArticlePreviousService } from "../../services/ComCommodityEntryArticlesPrevious.service";
import { ComCommodityEntryArticlesPreviousEntity } from "../../entities/ComCommodityEntryArticlesPreviousEntity";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { ComCommodityEntryService } from "../../services/ComCommodityEntryService";
import { ComCommodityEntryArticlesService } from "../../services/ComCommodityEntryArticlesService.service";
import { ComCommodityEntryArticlesLogEntity } from "../../entities/ComCommodityEntryArticlesLogEntity";
import { ComCommodityEntryArticlesLogService } from "../../services/ComCommodityEntryArticlesLogService.service";
import { ComCommodityEntryArticlesEntity } from "../../entities/ComCommodityEntryArticlesEntity";

@Component({
    selector: 'comArticlesList',
    templateUrl: 'comArticlesList.modal.html',
    styleUrls: ['./comArticlesList.modal.css']
})
export class ComArticlesListModal {
    public loading: boolean;
    ComCommoditySAPReturnModel: ComCommoditySAPReturnModel;
    title: string;
    message1: string;
    message2: string;
    message3: string;
    message4: string;
    message5: string;
    message6: string;
    columns: string[];
    isShown: boolean;

    quantity:number;
    quantityNew:number;
    idValidate:number;
    sapCode:string;
    sapCodeDescription:string;

    public numberEntry: string;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    json: any;
    unibytes: Uint8Array = null;
    form = new FormGroup({
    });


    constructor(private alertS: AlertService, public dialogRef: MatDialogRef<ComArticlesListModal>, private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any, private ComCommodityEntryArticlePreviousS:ComCommodityEntryArticlePreviousService,
        private ComCommodityEntryArticlesS:ComCommodityEntryArticlesService, private ComCommodityEntryArticlesLogS:ComCommodityEntryArticlesLogService,
        private ComS:ComCommodityEntryService) {

        dialogRef.disableClose = true;
        this.loading = false;

        this.sapCode='';
        this.sapCodeDescription = '';
        this.quantity = 0;
        this.quantityNew = 0;
        this.idValidate = 0;

        this.numberEntry = '';
        this.columns = ['sapCode', 'sapCodeDescription', 'quantity', 'actions'];
        this.dataSource = new MatTableDataSource([]);
        this.isShown = true;
        this.message1 = '';
        this.message2 = '';
        this.message3 = '';
        this.message4 = '';
        this.message5 = '';
        this.message6 = '';
        this.ComCommoditySAPReturnModel = new ComCommoditySAPReturnModel();

    }
    ngOnInit(): void {
        this.searchNumberEntry();
        this.list();
    }

    searchNumberEntry() {
        this.numberEntry = this.data.commodityEntryNumber;
    }

    createArticle() {
        this.dialog.open(ComArticlesNewModal, {
            data: {
                commodityEntryId: this.data.commodityEntryId,
                numberEntry: this.numberEntry
            },
            width: '100%'
        }).afterClosed().subscribe(resA => {
            if (resA['codigoSap'] != '') {
                this.sapCode = resA['codigoSap'];
                this.sapCodeDescription = resA['descripcion'];
            }
        });
    }

    delete(item: ComCommodityEntryArticlesEntity) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: 'Desea eliminar el registro?' },
            height: '250px',
            width: '400px'
          }).afterClosed().subscribe(res => {
              if (res) {
                this.ComCommodityEntryArticlePreviousS.delete(item.id).subscribe(res => {
                    if (res.message === 'OK') {
                        this.alertS.open('Registro eliminado', 'success');
                        this.list();
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }}, err => {
            this.alertS.open(err.message, 'error');
          });

    }

    saveArticle(){
        if(this.quantity != 0 && this.sapCode != '')
        {
            var envio = new ComCommodityEntryArticlesPreviousEntity();

            envio.sapCode = this.sapCode;
            envio.sapCodeDescription = this.sapCodeDescription;
            envio.quantity= this.quantity;
            envio.idCommodityEntry = this.data.commodityEntryId;
            envio.userId = (JSON.parse(localStorage.getItem("user"))["id"]);

            this.ComCommodityEntryArticlePreviousS.create(envio).subscribe(res => {
                if (res.message === 'OK') {
                    this.alertS.open('Registro agregado', 'success');
                    this.quantity = 0;
                    this.sapCode='';
                    this.sapCodeDescription='';
                    this.list();
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('Por favor ingrese todos los campos', 'error');
        }
    }

    approved(){
        this.data.commodityEntryId;
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿Desea aprobar el ingreso? Una vez finalizado no se podra editar' },
            height: '250px',
            width: '400px'
          }).afterClosed().subscribe(res => {
              if (res) {
                  if(this.dataSource.data.length > 0)
                  {
                    this.ComS.approvedEntry(this.data.commodityEntryId, (JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res=>{
                        if(res.message==='OK'){
                        if(res.object !=0){
                            this.alertS.open('Aprobacion de entrada con exito','success');
                            this.close();
                        }else{
                            this.alertS.open(res.message,'error');
                        }
                        }else{
                        this.alertS.open(res.message,'error');
                        }        
                    },err=>{
                        this.alertS.open(err.message,'error');
                    });
                } else {
                    this.alertS.open('No se puede aprobar ya que no tiene ningun ingreso','error');
                }
        }});
    }

    quantityChange(event: Event){
        var filterValue = (event.target as HTMLInputElement).value;
        this.idValidate = parseInt((event.target as HTMLInputElement).id);
        this.quantityNew = parseInt(filterValue.trim());
    }

    update(item: ComCommodityEntryArticlesEntity){
        
        if(item.quantity != this.quantityNew && this.quantityNew != 0 && this.idValidate == item.id){

            let envio = new ComCommodityEntryArticlesEntity();
            envio.id = item.id;
            envio.userId = (JSON.parse(localStorage.getItem("user"))["id"]);
            envio.quantity = this.quantityNew;

            this.ComCommodityEntryArticlesS.update(envio).subscribe(res => {
                if (res.message === 'OK') {
                    this.alertS.open('Registro actualizado', 'success');
                    var log = new ComCommodityEntryArticlesLogEntity();
                    log.articleId=item.id;
                    log.quantityPrevious = item.quantity;
                    log.quantityNew = this.quantityNew;
                    log.userId = (JSON.parse(localStorage.getItem("user"))["id"]);
                    this.ComCommodityEntryArticlesLogS.create(log).subscribe(res => {
                        if (res.message === 'OK') {
                            this.alertS.open('Log generado', 'success');
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                    this.list();
                    this.quantityNew = 0;
                    this.idValidate = 0;
                } else {
                    this.list();
                    this.quantityNew = 0;
                    this.idValidate = 0;
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.list();
                    this.quantityNew = 0;
                    this.idValidate = 0;
                this.alertS.open(err.message, 'error');
            });
        } else {
            
            this.quantityNew = 0;
            this.idValidate = 0;
            this.alertS.open('Para actualizar ingrese una cantidad diferente', 'error');
        }
    }

    list() {
        if(this.data.approved){
            this.ComCommodityEntryArticlePreviousS.listByEntryId(this.data.commodityEntryId).subscribe(res => {
                if (res.message === 'OK') {
                    this.loading = false;
                    this.dataSource = new MatTableDataSource<any>(res.object);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.json = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.ComCommodityEntryArticlesS.listByEntryId(this.data.commodityEntryId).subscribe(res => {
                if (res.message === 'OK') {
                    this.loading = false;
                    this.dataSource = new MatTableDataSource<any>(res.object);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.json = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }   
    }

    closeEntry(){
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿Desea cerrar el ingreso? Una vez finalizado no se podra editar' },
            height: '250px',
            width: '400px'
          }).afterClosed().subscribe(res => {
              if (res) {
                  if(this.dataSource.data.length > 0)
                  {
                    this.ComS.closeEntry(this.data.commodityEntryId, (JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res=>{
                        if(res.message==='OK'){
                        if(res.object !=0){
                            this.alertS.open('Cierre de entrada con exito','success');
                            this.close();
                        }else{
                            this.alertS.open(res.message,'error');
                        }
                        }else{
                        this.alertS.open(res.message,'error');
                        }        
                    },err=>{
                        this.alertS.open(err.message,'error');
                    });
                } else {
                    this.alertS.open('No se puede cerrar ya que no tiene ningun ingreso','error');
                }
        }});
    }

    //Descargar el documento obtenido
    downloadFile(file: ComCommodityPalletModel) {
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

    close(): void {
        this.dialogRef.close();
    }

    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();
    
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}