import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ComCommodityEntryService } from 'src/app/appComodityEntry/services/ComCommodityEntryService';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { ComCommodityEntryEntity } from 'src/app/appComodityEntry/entities/ComCommodityEntryEntity';
import { ComArticlesListModal } from 'src/app/appComodityEntry/modals/ComArticlesList/comArticlesList.modal';


@Component({
  selector: 'app-ComCommodityEntryArticlePreAlertNew',
  templateUrl: './ComCommodityEntryArticlePreAlertNew.component.html',
  styleUrls: ['./ComCommodityEntryArticlePreAlertNew.component.css']
})
export class ComCommodityEntryArticlePreAlertNewComponent implements OnInit{
  public loading: boolean;
  public searchPreAlert : boolean;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  columns: string[];
  form: FormGroup;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  unibytes: Uint8Array = null;
  
  constructor(private alertS: AlertService,private ComS:ComCommodityEntryService, private dialog: MatDialog) {
    this.loading = false;
    this.searchPreAlert = false;
    this.columns = ['number','customerName', 'city','origin', 'originType', 'userName', 'creationDate', 'state', 'active', 'actions'];
    this.dataSource = new MatTableDataSource([]);
  }
  ngOnInit(): void {
    this.title="Nueva Entrada con Pre-Alerta";
    this.listPreAlertActive();
  }
  
  startEntry(){}

  finishEntry(){}

  listPreAlertActive(){
    this.loading = true;
    this.ComS.listActiveEntry().subscribe(res => {
      if (res.message === 'OK') {
          this.loading = false;
          this.dataSource = new MatTableDataSource<any>(res.object);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      } else {
          this.loading = false;
          this.alertS.open(res.message, 'error');
      }
    }, err => {
        this.loading = false;
        this.alertS.open(err.message, 'error');
    });
  }

  newArticle(item:ComCommodityEntryEntity) {
    this.dialog.open(ComArticlesListModal, {
        data: { commodityEntryId:item.id,
                commodityEntryNumber:item.number,
                approved:true
              },
        width: '100%'
    }).afterClosed().subscribe(resA => {
      this.listPreAlertActive();
    });
  }

}



