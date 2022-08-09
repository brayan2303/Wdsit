import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ComCommodityEntryService } from 'src/app/appComodityEntry/services/ComCommodityEntryService';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ComCommodityEntryEntity } from 'src/app/appComodityEntry/entities/ComCommodityEntryEntity';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ComCommodityEntryPreAlertService } from 'src/app/appComodityEntry/services/ComCommodityEntryPreAlertService';


@Component({
  selector: 'app-ComCommodityEntryPrealertNew',
  templateUrl: './ComCommodityEntryPrealertNew.component.html',
  styleUrls: ['./ComCommodityEntryPrealertNew.component.css']
})
export class ComCommodityEntryPreAlertNewComponent implements OnInit{
  public loading: boolean;
  public loadingPreAlert: boolean;
  uploading: boolean;
  public selected:boolean;
  chargeBotton:boolean;
  title:string;
  columns: string[];
  comCommodityEntryNumber:string;
  comCommodityEntryId:number;
  columnsPreAlert: string[];
  dataSource = new MatTableDataSource<any>();
  listSerialPreAlert = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatTable) tableCharge: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('paginatorCharge') paginatorCharge: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sortCharge: MatSort;
  unibytes: Uint8Array = null;
  
  constructor(private alertS: AlertService,private ComPreAlertS:ComCommodityEntryPreAlertService,private ComS:ComCommodityEntryService, private dialog: MatDialog) {

    this.loading = false;
    this.loadingPreAlert = false;
    this.uploading = false;
    this.selected = false;
    this.chargeBotton = false;

    this.comCommodityEntryId = 0;
    this.comCommodityEntryNumber = '';

    this.columns = ['number','customerName', 'city','origin', 'originType', 'userName', 'creationDate', 'state', 'active', 'actions'];
    this.columnsPreAlert = ['idCommodityEntryNumber','orders', 'transact', 'codeAccesory', 'nameAccesory', 'quantity', 'assignDate', 'recolectionDate','active','creationDate'];
    this.dataSource = new MatTableDataSource([]);
    this.listSerialPreAlert = new MatTableDataSource([]);
  }
  ngOnInit(): void {
    this.list();
    this.title="Listado de Ingresos";
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }

  filterSerials(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listSerialPreAlert.filter = filterValue.trim();

    if (this.listSerialPreAlert.paginator) {
        this.listSerialPreAlert.paginator.firstPage();
    }
  }

  list(){
    this.loading = true;
    this.dataSource = new MatTableDataSource([]);
    this.ComS.list().subscribe(res => {
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

  selectEntry(item:ComCommodityEntryEntity){
    if(item.automatic == false)
    {
      this.chargeBotton = true;
      this.comCommodityEntryId = item.id;
    } else {
      this.chargeBotton = false;
    }
    this.uploading = false;
    this.selected = true;
    this.comCommodityEntryNumber = item.number;
    this.listPreAlert(item.id);
  }

  listPreAlert(entryId:number){
    this.loadingPreAlert = true;
    this.ComPreAlertS.listByEntryId(entryId).subscribe(res => {
      if (res.message === 'OK') {
          this.loadingPreAlert = false;
          this.listSerialPreAlert = new MatTableDataSource<any>(res.object);
          this.listSerialPreAlert.paginator = this.paginatorCharge;
          this.listSerialPreAlert.sort = this.sortCharge;
      } else {
          this.alertS.open(res.message, 'error');
      }
    }, err => {
        this.alertS.open(err.message, 'error');
    });
    this.loadingPreAlert = false;
  }

  charge(){
    this.dialog.open(ConfirmationComponent, {
      data: { message: 'Una vez cargada se sobreescriben los datos, esta seguro?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(res => {
        if (res) {
          this.listSerialPreAlert = new MatTableDataSource([]);
          this.loadingPreAlert = true;
          this.ComPreAlertS.charge(this.comCommodityEntryId,(JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res => {
            if (res.message === 'OK') {
                this.ComPreAlertS.chargeLoad(this.comCommodityEntryId).subscribe(res => {
                  if (res.message === 'OK') {
                    this.alertS.open('Pre Alerta cargado con exito!', 'success');
                    this.uploading = false;
                    this.loadingPreAlert = false;
                    this.listPreAlert(this.comCommodityEntryId);
                  }else {
                    this.alertS.open('Error al cargar el archivo!', 'error');
                    this.uploading = true;
                    this.loadingPreAlert = false;
                  }
                }, err => {
                    this.alertS.open('El archivo no es valido, por favor verificar espacios en blanco', 'error');
                    this.uploading = false;
                    this.loadingPreAlert = false;
                });
            }else {
              this.alertS.open('Error al cargar el archivo!', 'error');
              this.uploading = true;
              this.loadingPreAlert = false;
            }
          }, err => {
              this.alertS.open('El archivo no es valido, por favor verificar espacios en blanco', 'error');
              this.uploading = false;
              this.loadingPreAlert = false;
          });
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
  }

  /**
   * Cargar archivo para validar estructura
   */
   load(file: FileList) {
    if (file.length > 0) {
      this.loadingPreAlert = true;
      this.uploading = false;
      this.ComPreAlertS.load(this.comCommodityEntryId, file[0]).subscribe(resC => {
        if (resC.message === 'OK') {
          if (resC.object != 0) {
            this.alertS.open('Archivo cargado!', 'success');
            this.loadingPreAlert = false;
            this.uploading = true;
          } else {
            this.alertS.open('Error al cargar el archivo!', 'error');
            this.uploading = false;
            this.loadingPreAlert = false;
          }
        } else {
          this.alertS.open(resC.message, 'error');
          this.loadingPreAlert = false;
          this.uploading = false;
        }
      }, err => {
        this.alertS.open('El archivo no es valido, por favor verificar espacios en blanco', 'error');
        this.loadingPreAlert = false;
        this.uploading = false;
      
      });
    (document.getElementById('base')as HTMLInputElement).value=null;
   } else {
    this.alertS.open('El archivo no es valido, por favor verificar espacios en blanco', 'error');
    this.uploading = false;
    this.loadingPreAlert = false;
   }
  }

}