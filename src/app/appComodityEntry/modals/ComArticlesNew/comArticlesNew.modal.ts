import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ComCommodityEntryArticleService } from "../../services/ComCommodityEntryArticleService";
import { ComSapCodeModel } from "../../models/comSapCodeModel";
import { ComCommodityIntegrationCantService } from "../../services/comCommodityIntegrationService";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
    selector: 'comArticlesNew',
    templateUrl: 'comArticlesNew.modal.html',
    styleUrls: ['./comArticlesNew.modal.css']
})
export class ComArticlesNewModal {
    title: string;
    loading: boolean;
    columns: string[];
    dataSource= new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    

    constructor(private alertS: AlertService, private sapUlitity:ComCommodityIntegrationCantService ,private ComArtS:ComCommodityEntryArticleService,
        public dialogRef: MatDialogRef<ComArticlesNewModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.loading = false;
        this.columns = ['codigoSap','descripcion'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.title="Busqueda Codigo Sap";
        this.listSapCode();
    }

    listSapCode(){
        this.loading=true;
        this.sapUlitity.sapCodeList(this.data.commodityEntryId, Number(localStorage.getItem('countryId'))).subscribe(res => {
          if (res.message === 'OK') {
            this.dataSource= new MatTableDataSource<any>(res.object);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
              this.alertS.open(res.message, 'error');
          }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.loading = false;
    }

    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    
    close(item : ComSapCodeModel): void {
        this.dialogRef.close({'codigoSap':item.codigoSap,'descripcion':item.descripcion});
    }
}