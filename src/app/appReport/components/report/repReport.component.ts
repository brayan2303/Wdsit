import { Component, OnInit, ViewChild } from '@angular/core';
import { RepFieldService } from '../../services/repField.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RepFilterService } from '../../services/repFilter.service';
import { RepReportService } from '../../services/repReport.service';
import { RepReportModel } from '../../models/repReport.model';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RepFieldEntity } from '../../entities/repField.entity';
import { RepFilterEntity } from '../../entities/repFilter.entity';
import { RepReportEntity } from '../../entities/repReport.entity';
import { RepLogService } from '../../services/repLog.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import * as moment from 'moment';
import { RepWolkboxService } from '../../services/repWolkbox.service';
import { GenPlantEntity } from 'src/app/appGeneral/entities/genPlant.entity';
import { GenPlantService } from 'src/app/appGeneral/services/genPlant.service';
import { GenplantModel } from '../../models/genPlant.model';
import { DatePipe } from '@angular/common';
import { RepFlagLogService } from '../../services/repFlagLog.service';
import { RepFlagLogEntity } from '../../entities/repFlagLog.entity';
import { InformationComponent } from 'src/app/shared/components/information/information.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-repReport',
  templateUrl: './repReport.component.html',
  styleUrls: ['./repReport.component.css'],
})
export class RepReportComponent implements OnInit {
  loading: boolean;
  fieldList: RepFieldEntity[];
  filterList: RepFilterEntity[];
  genPersonEntity: GenPersonEntity;
  repReportEntity: RepReportEntity;
  repReportModel: RepReportModel;
  genPlantEntity: GenPlantEntity;
  plantList: GenPlantEntity[];
  plantaId: number;
  columns: string[];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  plantUserList: GenplantModel[];
  date: Date;
  date2: Date;
  space: string;
  reportId: number;
  userId: number;
  repFlagLogE: RepFlagLogEntity;
  validation: string;
  times: string;
  countryId:string

  constructor(private params: ActivatedRoute, private repFlagLogS: RepFlagLogService, private dialog: MatDialog, private genplantS: GenPlantService, private repFieldS: RepFieldService, private repFilterS: RepFilterService, private repReportS: RepReportService, private repLogS: RepLogService, private repWolkboxS: RepWolkboxService, private alertS: AlertService) {
    this.loading = false;
    this.fieldList = [];
    this.filterList = [];
    this.repReportEntity = new RepReportEntity();
    this.repReportModel = new RepReportModel();
    this.repReportModel.data = [];
    this.columns = [];
    this.dataSource = new MatTableDataSource([]);
    this.plantList = [];
    this.plantaId = 0;
    this.plantUserList = [];
    this.date = new Date();
    this.date2 = new Date();
    this.space = '';
    this.reportId = 0;
    this.userId = 0;
    this.repFlagLogE = new RepFlagLogEntity();
    this.validation = '';
    this.times = '';
    this.countryId = '';
  }
  ngOnInit(): void {
    this.space = '';
    this.countryId =localStorage.getItem('countryId');
    this.getPlant();
    this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
    this.params.paramMap.subscribe((p: Params) => {
      this.fieldList = [];
      this.filterList = [];
      this.repReportEntity = new RepReportEntity();
      this.repReportModel = new RepReportModel();
      this.repReportModel.data = [];
      this.columns = [];
      this.dataSource = new MatTableDataSource([]);
      this.reportId = p.get('reportId');
      this.userId = this.genPersonEntity.id;
      this.repFieldS.findByReportId(p.get('reportId')).subscribe(res => {
        if (res.message === 'OK') {
          this.fieldList = res.object;
          for (const f of this.fieldList) {
            this.columns.push(f.name);
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
      this.repReportS.findById(p.get('reportId')).subscribe(res => {
        if (res.message === 'OK') {
          this.repReportEntity = res.object;
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
      this.repFilterS.findByReportId(p.get('reportId')).subscribe(res => {
        if (res.message === 'OK') {
          this.filterList = res.object;
          for (let i = 0; i < this.filterList.length; i++) {
            if (this.filterList[i].type === 'list') {
              this.repFilterS.findQuery(this.filterList[i].query).subscribe(res => {
                if (res.message === 'OK') {
                  let query: string[] = res.object;
                  for (let q of query) {
                    /*let data = new RepFilterModel();
                    data.id = this.filterList[i].id;
                    data.data = q;
                    this.filterModelList.push(data);*/
                    var option = document.createElement('option') as HTMLOptionElement;
                    option.value = q;
                    option.text = q;
                    document.getElementById(String(this.filterList[i].id)).appendChild(option);
                  }
                } else {
                  this.alertS.open(res.message, 'error');
                }
              }, err => {
                this.alertS.open(err.message, 'error');
              });
            } else if (this.filterList[i].type === 'array') {
              for (let q = 0; q < this.filterList[i].query.split(',').length; q++) {
                var option = document.createElement('option') as HTMLOptionElement;
                option.value = this.filterList[i].query.split(',')[q];
                option.text = this.filterList[i].query.split(',')[q];
                document.getElementById(String(this.filterList[i].id)).appendChild(option);
              }
            }
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    });
  }
  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  search() {
    this.repFlagLogS.listValidationTime(this.reportId, this.userId).subscribe(resV => {
      if (resV.message === 'OK') {
        this.repFlagLogE = resV.object;
        this.times = this.repFlagLogE.times;
        if (this.times == null) {
          this.repFlagLogS.listValidation(this.reportId, this.userId).subscribe(resL => {
            if (resL.message === 'OK') {
              this.repFlagLogE = resL.object;
              this.validation = this.repFlagLogE.validacionReport;
              if (this.validation === 'OK') {
                this.repFlagLogS.create(this.reportId, this.userId).subscribe(resC => {
                  if (resC.message === 'OK') {
                    if (resC.object != 0) {
                      this.loading = true;
                      this.dataSource = new MatTableDataSource([]);
                      this.table.renderRows();
                      this.dataSource.paginator = this.paginator;
                      this.repReportModel.data = [];
                      if (this.repReportEntity.typeQuery === 'Procedimiento Almacenado') {
                        if (this.filterList.length > 0) {
                          let values: string[] = [];
                          for (let i = 0; i < this.filterList.length; i++) {
                            if ((document.getElementById(this.filterList[i].id.toString()) as HTMLInputElement).disabled) {
                              if (this.filterList[i].type === 'date') {
                                if (this.repReportEntity.section === 'Wms Sap' || this.repReportEntity.section === 'Agendamiento' || this.repReportEntity.section === 'Hielo Seco') {
                                  values.push(moment((document.getElementById(this.filterList[i].id.toString()) as HTMLInputElement).value).format('YYYY-MM-DD'));

                                } else {
                                  values.push(moment((document.getElementById(this.filterList[i].id.toString()) as HTMLInputElement).value).format('YYYY-DD-MM'));
                                }
                              } else {
                                values.push(moment((document.getElementById(this.filterList[i].id.toString()) as HTMLInputElement).value).format('YYYY-DD-MM'));
                              }
                            } else {
                              if (this.filterList[i].type === 'date') {
                                if (this.repReportEntity.section === 'Wms Sap' || this.repReportEntity.section === 'Agendamiento' || this.repReportEntity.section === 'Hielo Seco') {
                                  values.push(moment((document.getElementById(this.filterList[i].id.toString()) as HTMLInputElement).value).format('YYYY-MM-DD'));
                                } else {
                                  values.push(moment((document.getElementById(this.filterList[i].id.toString()) as HTMLInputElement).value).format('YYYY-DD-MM'));
                                }
                              } else {
                                values.push((document.getElementById(this.filterList[i].id.toString()) as HTMLInputElement).value);
                              }
                            }
                          }
                          let jsonString = "{";
                          for (let i = 0; i < this.filterList.length; i++) {
                            if (i < this.filterList.length - 1) {
                              jsonString = jsonString + "\"" + this.filterList[i].name + "\":\"" + values[i] + "\",";
                            } else {
                              jsonString = jsonString + "\"" + this.filterList[i].name + "\":\"" + values[i] + "\"}";
                            }
                          }
                          this.repReportModel.data.push(JSON.parse(jsonString));
                        }
                        if (this.repReportEntity.section != 'Wms Sap') {
                          this.plantaId = 0;
                        }
                        //, this.plantaId falta la planta
                        this.repReportS.execute(this.repReportEntity.section, this.repReportEntity.id, this.repReportEntity.storeProcedure, this.repReportModel, Number(localStorage.getItem('countryId')), JSON.parse(localStorage.getItem('customerId')), this.plantaId).subscribe(res => {
                          if (res.message === 'OK') {
                            this.loading = false;
                            this.dataSource = new MatTableDataSource<any>(res.object);
                            this.updateLog(this.reportId, this.userId);
                            this.table.renderRows();
                            this.dataSource.paginator = this.paginator;
                            this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
                          } else {
                            this.alertS.open(res.message, 'error');
                            this.loading = false;
                          }
                        }, err => {
                          this.alertS.open(err.message, 'error');
                          this.loading = false;
                        });

                      } else {
                        this.repWolkboxS.list().subscribe(res => {
                          if (res.message === 'OK') {
                            this.loading = false;
                            this.dataSource = new MatTableDataSource<any>(res.object);
                            this.table.renderRows();
                            this.dataSource.paginator = this.paginator;
                            this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
                          } else {
                            this.alertS.open(res.message, 'error');
                            this.loading = false;
                          }
                        }, err => {
                          this.alertS.open(err.message, 'error');
                          this.loading = false;
                        });
                        this.clear();
                      }
                    } else {
                      this.alertS.open(resC.message, 'error');
                    }
                  } else {
                    this.alertS.open(resC.message, 'error');
                  }
                }, err => {
                  this.alertS.open(err.message, 'error');
                });
              } else {
                var information = this.dialog.open(InformationComponent, {
                  data: { message: 'Se encuentra generando un reporte por favor espere que termine el primer proceso' },
                });
              }
            } else {
              this.alertS.open(resL.message, 'error');
            }

          }, err => {
            this.alertS.open(err.message, 'error');
          });
        } else {
          this.updateLog(this.reportId, this.userId);
        }
      } else {
        this.alertS.open(resV.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  updateLog(reportId: number, userId: number) {
    this.repFlagLogS.update(reportId, userId).subscribe(resP => {
      if (resP.message === 'OK') {
        if (resP.object != 0) {
          this.alertS.open('Reporte habilitado', 'success');
        } else {
          this.alertS.open(resP.message, 'error');
        }
      } else {
        this.alertS.open(resP.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    })

  }

  download() {
    this.repLogS.create(this.repReportEntity.id, this.genPersonEntity.id).subscribe(res => {
      if (res.object === 0 || res.message != 'OK') {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    let delimiter = "\\";
    let headers = '';
    let file = '';

    for (let i = 0; i < this.columns.length; i++) {
      headers = headers + this.columns[i];
      if (i < this.columns.length - 1) {
        headers = headers + delimiter;
      }
    }
    file = headers;
    for (let i = 0; i < this.dataSource.data.length; i++) {
      file = file + "\n";
      for (let j = 0; j < this.columns.length; j++) {
        file = file + this.dataSource.data[i][this.columns[j]];
        file = file + delimiter;
      }
    }
    let blob = new Blob(['\ufeff' + file], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", url);
    downloadLink.setAttribute("download", this.repReportEntity.name + ".csv");
    downloadLink.style.visibility = "hidden";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  getPlant() {
    this.repReportS.findByUserId(this.genPersonEntity = (JSON.parse(localStorage.getItem('user')).id), this.countryId).subscribe(res => {
      if (res.message === 'OK') {
        this.plantUserList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  getMaxDate() {

    let todays = new Date(this.date) || new Date();
    var maxDate = todays;
    var ex = maxDate.setDate(todays.getDate() + 60);
    this.date2 = new Date(ex);

    return this.date2.toISOString().split('T')[0] || this.clear();

  }
  clear() {
    this.space = '';
  }

  getMinDate() {
    let todays = new Date(this.date) || new Date();
    return todays.toISOString().split('T')[0];
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

}
