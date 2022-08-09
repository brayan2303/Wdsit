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
import { SerialSapModel } from '../../models/serialSap.model';
import { PriPrinterService } from '../../services/priPrinter.service';
import { PriPrinterEntity } from '../../entities/priPrinter.entity';

@Component({
  selector: 'app-priPacking',
  templateUrl: './priPacking.component.html',
  styleUrls: ['./priPacking.component.css']
})
export class PriPackingComponent implements OnInit {
  loading: boolean;
  genPersonEntity: GenPersonEntity;
  data: SerialSapModel[];
  columns: string[];
  headers: string[];
  priLabelEntity: PriLabelEntity;
  priLabelModel: PriLabelModel;
  fieldList: PriFieldEntity[];
  @ViewChild(MatTable) table: MatTable<any>;
  printerList:PriPrinterEntity[];
  printerId:number;

  constructor(private params: ActivatedRoute, private priLabelS: PriLabelService,private priPrinterS:PriPrinterService, private priLogS: PriLogService, private priFieldS: PriFieldService, private alertS: AlertService) {
    this.loading = false;
    this.priLabelEntity = new PriLabelEntity();
    this.priLabelModel = new PriLabelModel();
    this.fieldList = [];
    this.headers = [];
    this.columns = [];
    this.data = [];
    this.printerList=[];
    this.printerId=0;
  }

  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.priPrinterS.listActive(Number(localStorage.getItem('customerId')), 'Empaque').subscribe(res => {
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
        this.headers.push('Codigo Sap');
        this.headers.push('Descripcion');
        this.headers.push('Caja');
        this.priLabelModel.columns = this.columns;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  search() {
    let box = (document.getElementById('box') as HTMLInputElement).value;
    let value = (document.getElementById('search') as HTMLInputElement).value;
    let userId = (JSON.parse(localStorage.getItem("user"))["id"]);
    this.data=[];
    if (value != '') {
      this.loading = true;
      this.priLabelS.searchPrint(userId, value, box).subscribe(resP => {
        if (resP.message === 'OK') {
          this.priLabelS.findPallet(Number(localStorage.getItem('countryId')),Number(localStorage.getItem('customerId')),value,box).subscribe(res => {
            if (res.message === 'OK') {
              if (res.object != null) {
                this.data = res.object;
                if (box != '') {
                  let items = [];
                  for (let i = 0; i < this.data.length; i++) {
                    if (String(this.data[i].ncajaEmpaque) === box) {
                      items.push(this.data[i]);
                    }
                  }
                  this.data = items;
                }
                this.loading = false;
                this.table.renderRows();
              } else {
                this.alertS.open('Pallet no encontrado!', 'warning');
                this.loading = false;
              }
            } else {
              this.alertS.open(res.message, 'error');
              this.loading = false;
            }
          }, err => {
            this.alertS.open(err.message, 'error');
            this.loading = false;
          });
        } else {
          this.alertS.open('No esta autorizado para la impresion','error');
          this.loading = false;
        }
      }, err => {
        this.alertS.open(err.message, 'error');
        this.loading = false;
      });
    } else {
      this.alertS.open('Ingrese un número de pallet!', 'warning');
      this.loading = false;
    }
  }
  print() {
    let box = (document.getElementById('box') as HTMLInputElement).value;
    let pallet = (document.getElementById('search') as HTMLInputElement).value;
    let userId = (JSON.parse(localStorage.getItem("user"))["id"]);
    this.priLabelModel.rows = this.data;
    console.log(this.priLabelModel);
        this.priLabelS.print(this.printerId,this.priLabelEntity.id, this.priLabelModel).subscribe(resP => {
          if (resP.message === 'OK') {
            if (resP.object === 1) {
              this.alertS.open('Impresion finalizada!','success');
              let priLogList = [];
              let priLogEntity = new PriLogEntity();
              priLogEntity.labelId = this.priLabelEntity.id;
              priLogEntity.personId = this.genPersonEntity.id;
              priLogEntity.serial = '0';
              priLogList.push(priLogEntity);
              this.priLabelS.createHistory(userId, pallet, box).subscribe(resP => {
              }, err => {
                this.alertS.open(err.message, 'error')
              });
              this.priLogS.create(priLogList).subscribe(resC => {
                if(resC.message==='OK'){
                  if(resC.object!=0){
                    this.data = [];
                    this.priLabelModel.rows = [];
                  }else{
                    this.alertS.open('Error al crear el log!','error');
                  }
                }else{
                  this.alertS.open(resC.message,'error');
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
  }
}
