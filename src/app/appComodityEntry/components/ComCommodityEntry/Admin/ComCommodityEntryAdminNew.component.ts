import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ComOriginModel } from 'src/app/appComodityEntry/models/comOriginModel';
import { ComOriginTypeModel } from 'src/app/appComodityEntry/models/comOriginTpye';
import { ComCommodityEntryService } from 'src/app/appComodityEntry/services/ComCommodityEntryService';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ComCommodityEntryEntity } from 'src/app/appComodityEntry/entities/ComCommodityEntryEntity';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ComArticlesListModal } from 'src/app/appComodityEntry/modals/ComArticlesList/comArticlesList.modal';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { GenPersonCustomerService } from 'src/app/appGeneral/services/genPersonCustomer.service';
import { GenPersonCustomerEntity } from 'src/app/appGeneral/entities/genPersonCustomer.entity';
import { GenCityEntity } from 'src/app/appGeneral/entities/genCity.entity';
import { GenCityService } from 'src/app/appGeneral/services/genCity.service';


@Component({
  selector: 'app-ComCommodityEntryAdminNew',
  templateUrl: './ComCommodityEntryAdminNew.component.html',
  styleUrls: ['./ComCommodityEntryAdminNew.component.css']
})
export class ComCommodityEntryAdminNewComponent implements OnInit {
  public loading: boolean;
  @Input() ComCommodityEntryId: number;
  @Output() closeDialog = new EventEmitter<any>();
  editing: number;
  title: string;
  form: FormGroup;
  originList: ComOriginModel[];
  originTypeList: ComOriginTypeModel[];
  comCommodityEntry: ComCommodityEntryEntity[];
  customerList: GenPersonCustomerEntity[];
  cityList: GenCityEntity[];
  origin: string;
  city: string;
  customerId: number;
  originType: string;
  columns: string[];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  unibytes: Uint8Array = null;
  countryId:string;

  constructor(private fb: FormBuilder, private alertS: AlertService, private GenCustomer: GenPersonCustomerService, private GenC: GenCityService, private ComS: ComCommodityEntryService, private dialog: MatDialog) {
    this.ComCommodityEntryId = 0;
    this.editing = 0;
    this.customerId = 0;
    this.origin = '';
    this.originType = '';
    this.originList = [];
    this.originTypeList = [];
    this.comCommodityEntry = [];
    this.customerList = [];
    this.countryId = '';
    this.loading = false;
    this.columns = ['id', 'number', 'customerName', 'city', 'origin', 'originType', 'userName', 'creationDate', 'state', 'active', 'actions'];
    this.dataSource = new MatTableDataSource([]);
  }


  ngOnInit(): void {
    this.countryId =localStorage.getItem('countryId');
    this.formBuilders();
    this.list();
    this.getLocation();
    this.getCustomerList();
    this.getCity();
    if (this.ComCommodityEntryId != 0) {
      this.title = "Editar Registro";
    } else {
      this.title = "Nuevo registro";
    }
  }

  getLocation() {

  }

  getCustomerList() {
    this.GenCustomer.listCustomer((JSON.parse(localStorage.getItem("user"))["id"]), JSON.parse(localStorage.getItem("countryId"))).subscribe(res => {
      if (res.message === 'OK') {
        this.customerList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  getCity() {
    this.GenC.listByCountry(JSON.parse(localStorage.getItem("countryId"))).subscribe(res => {
      if (res.message === 'OK') {
        this.cityList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  getOriginList() {
    this.ComS.originList(Number(this.countryId), this.customerId).subscribe(res => {
      if (res.message === 'OK') {
        this.originList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  delete(entryId: number) {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿ Desea eliminar el registro ?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
        this.ComS.delete(entryId).subscribe(res => {
          if (res.message === 'OK') {
            this.alertS.open('Registro eliminado', 'success');
            this.list();
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

  getOriginType(origin: string) {

    this.ComS.originTypeList(Number(this.countryId), this.customerId, origin).subscribe(res => {
      if (res.message === 'OK') {
        this.originTypeList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  //Validacion del formulario
  formBuilders() {
    this.form = this.fb.group({
      customerId: [, [Validators.required]],
      origin: [, [Validators.required]],
      originType: [, [Validators.required]],
      agentIdentification: [, [Validators.required]],
      city: [, [Validators.required]],
      active: new FormControl('')
    });
  }

  save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    if (this.editing === 0) {
      this.ComS.create((JSON.parse(localStorage.getItem("user"))["id"]), Number(this.countryId), this.customerId,this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.closeDialog.emit();
            this.alertS.open('Registro creado bajo el numero: ' + res.object, 'success');
            this.list();
          } else {
            this.alertS.open(res.message, 'error');
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.ComS.update(this.editing, this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.list();
            this.closeEditing();
            this.form.setValue({
              'origin': '',
              'originType': '',
              'agentIdentification': '',
              'city': '',
              'customerId': ''
            });
            this.closeDialog.emit();
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
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  list() {
    this.ComS.list().subscribe(res => {
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

  newArticle(item: ComCommodityEntryEntity, commodityEntryId: number) {
    if (item.state != 'Creada') {
      this.alertS.open('Esta entrada se encutra en el siguiente estado: ' + item.state, 'warning');
    } else {
      this.dialog.open(ComArticlesListModal, {
        data: {
          commodityEntryId: commodityEntryId,
          approved: true
        },
        width: '100%'
      }).afterClosed().subscribe(resA => {
        this.list();
      });
    }
  }

  edit(item: ComCommodityEntryEntity) {
    if (item.state != 'Creada') {
      this.alertS.open('Esta entrada se encutra en el siguiente estado: ' + item.state, 'warning');
    } else {
      this.getOriginType(item.origin);
      this.editing = item.id;
      this.form.setValue({
        'city': item.city,
        'customerId': item.customerId,
        'origin': item.origin,
        'originType': item.originType,
        'agentIdentification': item.agentIdentification,
        'active': item.active
      });
    }
  }

  closeEditing() {
    this.editing = 0;
    this.form.setValue({
      'city': '',
      'customerId': '',
      'origin': '',
      'originType': '',
      'agentIdentification': '',
      'active': ''
    });
  }

}



