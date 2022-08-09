import { Component, OnInit, ViewChild } from '@angular/core';
import { PriLabelService } from '../../services/priLabel.service';
import { PriLabelModel } from '../../models/priLabel.model';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { PriFieldService } from '../../services/priField.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PriLabelEntity } from '../../entities/priLabel.entity';
import { PriFieldEntity } from '../../entities/priField.entity';
import { PriLogService } from '../../services/priLog.service';
import { PriLogEntity } from '../../entities/priLog.entity';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { PriUnreadableService } from '../../services/priUnreadable.service';
import { PriPrnCodeEntity } from '../../entities/priPrnCode.entity';
import { PriPrinterEntity } from '../../entities/priPrinter.entity';
import { PriPrinterService } from '../../services/priPrinter.service';

@Component({
  selector: 'app-priEntry',
  templateUrl: './priEntry.component.html',
  styleUrls: ['./priEntry.component.css']
})
export class PriEntryComponent implements OnInit {
  option: string;
  serials: number;
  loading: boolean;
  genPersonEntity: GenPersonEntity;
  data: any[];
  columns: string[];
  headers: string[];
  priLabelEntity: PriLabelEntity;
  priLabelModel: PriLabelModel;
  fieldList: PriFieldEntity[];
  @ViewChild(MatTable) table: MatTable<any>;
  printerList: PriPrinterEntity[];
  printerId: number;

  constructor(private params: ActivatedRoute, private priLabelS: PriLabelService, private priPrinterS: PriPrinterService, private priUnreadableS: PriUnreadableService, private priLogS: PriLogService, private priFieldS: PriFieldService, private alertS: AlertService) {
    this.option = 'Crear ilegibles';
    this.serials = 0;
    this.loading = false;
    this.priLabelEntity = new PriLabelEntity();
    this.priLabelModel = new PriLabelModel();
    this.fieldList = [];
    this.headers = [];
    this.columns = [];
    this.data = [];
    this.printerId = 0;
    this.printerList = [];
  }

  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.priPrinterS.listActive(Number(localStorage.getItem('customerId')), 'Ingreso').subscribe(res => {
      if (res.message === 'OK') {
        this.printerList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    this.params.paramMap.subscribe((p: Params) => {
      this.priLabelS.findById(p.get('labelId')).subscribe(res => {
        if (res.message === 'OK') {
          this.priLabelEntity = res.object;
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
      this.getFields(p.get('labelId'));
    });
  }
  getFields(value: number) {
    this.priLabelEntity = new PriLabelEntity();
    this.priLabelModel = new PriLabelModel();
    this.fieldList = [];
    this.headers = [];
    this.columns = [];
    this.data = [];
    this.priFieldS.findByLabelId(value).subscribe(res => {
      if (res.message === 'OK') {
        this.fieldList = res.object;
        for (let f of this.fieldList) {
          this.headers.push(f.name);
          this.columns.push(f.code);
        }
        this.priLabelModel.columns = this.columns;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  create() {
    if (this.serials != 0) {
      this.priUnreadableS.create(Number(localStorage.getItem('countryId')), Number(localStorage.getItem('customerId')), this.genPersonEntity.id, this.serials).subscribe(resC => {
        if (resC.message === 'OK') {
          if (resC.object != 0) {
            this.alertS.open('Seriales creados!', 'success');
            this.priUnreadableS.list(Number(localStorage.getItem('countryId')), Number(localStorage.getItem('customerId')), this.genPersonEntity.id, this.serials).subscribe(resL => {
              if (resL.message === 'OK') {
                if (resL.object != null) {
                  this.data = resL.object;
                  let items = [];
                  for (let i = 0; i < this.data.length; i++) {
                    items.push(this.data[i]);
                  }
                  this.data = items;
                  this.loading = false;
                  this.table.renderRows();
                } else {
                  this.alertS.open('Pallet no encontrado!', 'warning');
                }
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Error al crear los seriales!', 'error');
          }
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.alertS.open('Ingrese una cantidad!', 'warning');
    }
  }
  search() {
    let value = (document.getElementById('search') as HTMLInputElement).value;
    if (value != '') {
      this.loading = true;
      this.priLabelS.findPalletUnreadable(value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != null) {
            this.data = res.object;
            let items = [];
            for (let i = 0; i < this.data.length; i++) {
              items.push(this.data[i]);
            }
            this.data = items;
            this.loading = false;
            this.table.renderRows();
          } else {
            this.alertS.open('Pallet no encontrado!', 'warning');
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.alertS.open('Ingrese un número de pallet!', 'warning');
    }
  }
  print() {
    if (this.printerId != 0 && this.option != '') {
      this.priLabelModel.rows = this.data;
      this.priLabelS.print(this.printerId, this.priLabelEntity.id, this.priLabelModel).subscribe(resP => {
        if (resP.message === 'OK') {
          if (resP.object === 1) {
            this.alertS.open('Impresion finalizada!', 'success');
            let priLogList = [];
            let priLogEntity = new PriLogEntity();
            priLogEntity.labelId = this.priLabelEntity.id;
            priLogEntity.personId = this.genPersonEntity.id;
            priLogEntity.serial = '0';
            priLogList.push(priLogEntity);
            this.priLogS.create(priLogList).subscribe(resC => {
              if (resC.message === 'OK') {
                if (resC.object != 0) {
                  this.data = [];
                  this.priLabelModel.rows = [];
                } else {
                  this.alertS.open('Error al crear el log!', 'error');
                }
              } else {
                this.alertS.open(resC.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          }
        } else {
          this.alertS.open(resP.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.alertS.open('Complete la informacion!', 'warning');
    }
  }
}
