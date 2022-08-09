import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ComCommodityIntegrationCantService } from '../../services/comCommodityIntegrationService';


@Component({
  selector: 'app-ComCommdityIntegration',
  templateUrl: './ComCommdityIntegration.component.html',
  styleUrls: ['./ComCommdityIntegration.component.css']
})
export class ComCommdityIntegrationComponent implements OnInit{
  public loading: boolean;
  public searchPreAlert : boolean;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  columns: string[];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  unibytes: Uint8Array = null;
  pallet: string;
  
  constructor(private alertS: AlertService,private ComS:ComCommodityIntegrationCantService, private dialog: MatDialog) {
    this.loading = false;
    this.searchPreAlert = false;
    this.columns = ['cantPrevious', 'cantSend', 'cantNew', 'codSap', 'docEntry', 'docNum', 'codeStatus', 'pallet'];
    this.dataSource = new MatTableDataSource([]);
    this.pallet = '';
  }
  ngOnInit(): void {
    this.title="Resultado";
  }

    search(){
    this.loading = true;
    this.ComS.list(this.pallet).subscribe(res => {
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
    this.loading = false;
  }

 

}



