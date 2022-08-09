import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PriLabelModel } from '../../models/priLabel.model';
import { PriLabelService } from '../../services/priLabel.service';
import { PriFieldService } from '../../services/priField.service';
import { MatTable } from '@angular/material/table';
import { SerialSapModel } from '../../models/serialSap.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PriLogService } from '../../services/priLog.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { PriLogEntity } from '../../entities/priLog.entity';
import { PriFieldEntity } from '../../entities/priField.entity';
import { PriLabelEntity } from '../../entities/priLabel.entity';
import { PriPrinterEntity } from '../../entities/priPrinter.entity';
import { PriPrinterService } from '../../services/priPrinter.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailVariableModal } from '../../modals/detailVariable/detailVariable.modal';
import { PriVariableDetailService } from '../../services/priVariableDetail.service';
import { PriVariableValueModel } from '../../models/priVariableValue.model';
import { PriVariableDetailEntity } from '../../entities/priVariableDetail.entity';
import { FormGroup } from '@angular/forms';
import { SplitPipe } from 'src/app/appPqrs/pipes/split.pipe';
import { format } from 'url';
import { DataRowOutlet } from '@angular/cdk/table';

@Component({
  selector: 'app-priLabel',
  templateUrl: './priLabel.component.html',
  styleUrls: ['./priLabel.component.css']
})
export class PriLabelComponent implements OnInit {
  @Input() labelIds: number;
  id: number;
  name: number;
  count: number;
  genPersonEntity: GenPersonEntity;
  priLogList: PriLogEntity[];
  serialSapModel: SerialSapModel;
  priLabelEntity: PriLabelEntity;
  priLabelModel: PriLabelModel;
  fieldList: PriFieldEntity[];
  fieldOrderList: PriFieldEntity[];
  PriFieldE: PriFieldEntity;
  headers: string[];
  headersMapped: string[];
  columns: string[];
  data: any[];
  @ViewChild(MatTable) table: MatTable<any>;
  printerList: PriPrinterEntity[];
  printerId: number;
  variableList: PriVariableValueModel[];
  priVariableValueM: PriVariableValueModel[];
  priVariableValueModel: PriVariableValueModel[];
  values: string;
  form: FormGroup;
  formula: string;
  conversion: string;
  potenciaNumero: number;
  cantidad: number;
  globalOne: string;
  globalTwo: string;
  globalThree: string;
  globalfour: string;
  validation: string;

  constructor(private priVariableDetailS: PriVariableDetailService, private dialog: MatDialog, private params: ActivatedRoute, private priLabelS: PriLabelService, private priPrinterS: PriPrinterService, private priFieldS: PriFieldService, private alertS: AlertService, private priLogS: PriLogService) {
    this.count = 0;
    this.priLogList = [];
    this.priVariableValueModel = []
    this.genPersonEntity = new GenPersonEntity();
    this.serialSapModel = new SerialSapModel();
    this.priLabelEntity = new PriLabelEntity();
    this.priLabelModel = new PriLabelModel();
    this.fieldList = [];
    this.fieldOrderList = [];
    this.headers = [];
    this.headersMapped = [];
    this.columns = [];
    this.data = [];
    this.printerList = [];
    this.printerId = 0;
    this.labelIds = 0;
    this.PriFieldE = new PriFieldEntity();
    this.variableList = [];
    this.values = '';
    this.priVariableValueM = [];
    this.formula = '';
    this.name = 0;
    this.conversion = '';
    this.potenciaNumero = 0;
    this.cantidad = 0;
    this.globalOne = '';
    this.globalTwo = '';
    this.globalThree = '';
    this.globalfour = '';
    this.validation = '';
  }
  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.params.paramMap.subscribe((p: Params) => {
      this.priLabelS.findById(p.get('labelId')).subscribe(res => {
        if (res.message === 'OK') {
          this.priLabelEntity = res.object;
          if (this.priLabelEntity.name.startsWith('UNITARIA')) {
            this.priPrinterS.listActive(Number(localStorage.getItem('customerId')), 'Empaque').subscribe(res => {
              if (res.message === 'OK') {
                this.printerList = res.object;
              } else {
                this.alertS.open(res.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.priPrinterS.listActive(Number(localStorage.getItem('customerId')), 'Etiquetado').subscribe(res => {
              if (res.message === 'OK') {
                this.printerList = res.object;
              } else {
                this.alertS.open(res.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          }
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
    this.serialSapModel = new SerialSapModel();
    this.priLabelEntity = new PriLabelEntity();
    this.priLabelModel = new PriLabelModel();
    this.fieldList = [];
    this.headers = [];
    this.headersMapped = [];
    this.columns = [];
    this.data = [];
    this.priFieldS.findByLabelId(value).subscribe(res => {
      if (res.message === 'OK') {
        this.fieldList = res.object;
        this.priFieldS.findByLabelIdOrder(value).subscribe(resM => {
          if (resM.message === 'OK') {
            this.fieldOrderList = resM.object;
            for (let f of this.fieldOrderList) {
              this.headers.push(f.name.toLocaleLowerCase());
              if (f.code === 'serial' || f.code === 'mac') {
                this.headersMapped.push(f.code.toLocaleLowerCase());
              } else {
                if (f.code === 'variable1_') {
                  this.headersMapped.push('campo1');
                } else if (f.code === 'variable2_') {
                  this.headersMapped.push('campo2');
                } else if (f.code === 'variable3_') {
                  this.headersMapped.push('campo3');
                } else if (f.code === 'variable4_') {
                  this.headersMapped.push('campo4');
                } else if (f.code === 'variable5_') {
                  this.headersMapped.push('campo5');
                } else if (f.code === 'variable6_') {
                  this.headersMapped.push('campo6');
                } else if (f.code === 'variable7_') {
                  this.headersMapped.push('campo7');
                } else if (f.code === 'variable8_') {
                  this.headersMapped.push('campo8');
                } else if (f.code === 'variable9_') {
                  this.headersMapped.push('campo9');
                } else if (f.code === 'variable10_') {
                  this.headersMapped.push('campo10');
                }
              }
              this.columns.push(f.code);
            }
            this.headers.push('Acciones');
            this.priLabelModel.columns = this.columns;
            this.priLabelModel.rows = [];
          } else {
            this.alertS.open(res.message, 'error');
          }
        }, err => {
          this.alertS.open(err.message, 'error');
        });
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  onKeyPressed(event) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (event.key === 'Tab') {
        event.preventDefault();
      }
      var serial = (document.getElementsByName('1') as unknown as HTMLInputElement)[0].value;
      this.name = Number(event.srcElement.getAttribute('name'));
      var validacion = document.getElementsByName("" + (this.name + 1))[0];
      if (validacion == undefined) {
        if ((document.getElementsByName(String(this.name)) as unknown as HTMLInputElement)[0].value != '') {
          this.deleteSeries();
          this.verfic();
          this.priLabelS.findSerial((document.getElementsByName('1') as unknown as HTMLInputElement)[0].value, Number(localStorage.getItem('customerId')), Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
              if (res.object != null) {
                this.serialSapModel = res.object;
                this.priLabelS.listValidation(serial, this.genPersonEntity.id).subscribe(resS => {
                  if (resS.message === 'OK') {
                    this.PriFieldE = resS.object;
                    if (this.PriFieldE.validation === 'OK') {
                      this.priLabelS.validationSerial(serial, this.genPersonEntity.id).subscribe(resL => {
                        if (resL.message === 'OK') {
                          if (resL.object != 0) {
                            this.add();
                          } else {
                            this.alertS.open(resL.message, 'error');
                          }
                        } else {
                          this.alertS.open(resL.message, 'error');
                        }
                      })
                    }else{
                      this.alertS.open('Serial no encontrado!', 'warning');
                      for (let i = 0; i < this.fieldList.length; i++) {
                        (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value = '';
                      }
                      (document.getElementsByName('1') as unknown as HTMLInputElement)[0].focus();
                      this.alertS.open('El serial ya se encuentra impreso','warning')
                    }    
                  } else {
                    this.alertS.open(resS.message, 'error');
                  }
                }, err => {
                  this.alertS.open(err.message, 'error');
                })
           
              } else {
                this.alertS.open('Serial no encontrado!', 'warning');
                for (let i = 0; i < this.fieldList.length; i++) {
                  (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value = '';
                }
                (document.getElementsByName('1') as unknown as HTMLInputElement)[0].focus();
              }
            } else {
              this.alertS.open(res.message, 'error');
            }
          }, err => {
            this.alertS.open(err.message, 'error');
          });
        } else {
          this.alertS.open('Por favor ingrese la informacion!', 'warning');
        }
      } else {
        if (document.getElementsByName("" + (this.name + 1))[0].getAttribute("readonly") == 'true') {
          if ((document.getElementsByName(String(this.name)) as unknown as HTMLInputElement)[0].value != '') {
            this.verfic();
            this.priLabelS.findSerial((document.getElementsByName('1') as unknown as HTMLInputElement)[0].value, Number(localStorage.getItem('customerId')), Number(localStorage.getItem('countryId'))).subscribe(res => {
              if (res.message === 'OK') {
                if (res.object != null) {
                  this.serialSapModel = res.object;
                  this.add();
                } else {
                  this.alertS.open('Serial no encontrado!', 'warning');
                  for (let i = 0; i < this.fieldList.length; i++) {
                    (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value = '';
                  }
                  (document.getElementsByName('1') as unknown as HTMLInputElement)[0].focus();
                }
              } else {
                this.alertS.open(res.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Por favor ingrese la informacion!', 'warning');
          }
        } else {
          (document.getElementsByName(String(this.name + 1)) as unknown as HTMLInputElement)[0].focus();
        }
      }
    



    }
    }

  add() {
    if (this.data.length > 0) {
      if (!this.data.some(x => x.serial === this.serialSapModel.serial)) {
        for (let i = 2; i < this.fieldList.length; i++) {
          if (i === 2) {
            this.serialSapModel.campo1 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
          } else if (i === 3) {
            this.serialSapModel.campo2 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
          } else if (i === 4) {
            this.serialSapModel.campo3 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
          } else if (i === 5) {
            this.serialSapModel.campo4 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
          } else if (i === 6) {
            this.serialSapModel.campo5 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
          } else if (i === 7) {
            this.serialSapModel.campo6 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
          } else if (i === 8) {
            this.serialSapModel.campo7 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
          } else if (i === 9) {
            this.serialSapModel.campo8 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
          } else if (i === 10) {
            this.serialSapModel.campo9 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
          } else if (i === 11) {
            this.serialSapModel.campo10 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
          }
        }
        this.priLabelModel.rows.push(this.serialSapModel);
        this.data = this.priLabelModel.rows;
        this.count++;
        this.table.renderRows();
        for (let i = 0; i < this.fieldList.length; i++) {
          (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value = '';
        }
        (document.getElementsByName('1') as unknown as HTMLInputElement)[0].focus();
      } else {
        this.alertS.open('El serial ya esta en la lista!', 'warning');
        for (let i = 0; i < this.fieldList.length; i++) {
          (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value = '';
        }
        (document.getElementsByName('1') as unknown as HTMLInputElement)[0].focus();
      }
    } else {
      for (let i = 2; i < this.fieldList.length; i++) {
        if (i === 2) {
          this.serialSapModel.campo1 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
        } else if (i === 3) {
          this.serialSapModel.campo2 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
        } else if (i === 4) {
          this.serialSapModel.campo3 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
        } else if (i === 5) {
          this.serialSapModel.campo4 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
        } else if (i === 6) {
          this.serialSapModel.campo5 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
        } else if (i === 7) {
          this.serialSapModel.campo6 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
        } else if (i === 8) {
          this.serialSapModel.campo7 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
        } else if (i === 9) {
          this.serialSapModel.campo8 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
        } else if (i === 10) {
          this.serialSapModel.campo9 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
        } else if (i === 11) {
          this.serialSapModel.campo10 = (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value;
        }
      }
      this.priLabelModel.rows.push(this.serialSapModel);
      this.data = this.priLabelModel.rows;
      this.count++;
      this.table.renderRows();
      for (let i = 0; i < this.fieldList.length; i++) {
        (document.getElementsByName(String(i + 1)) as unknown as HTMLInputElement)[0].value = '';
      }
      (document.getElementsByName('1') as unknown as HTMLInputElement)[0].focus();
    }
  }
  print() {
    this.priLabelS.print(this.printerId, this.priLabelEntity.id, this.priLabelModel).subscribe(resP => {
      if (resP.message === 'OK') {
        if (resP.object != 0) {
          this.alertS.open('Impresion finalizada!', 'success');
          for (let i of this.data) {
            let priLogModel = new PriLogEntity();
            priLogModel.labelId = this.priLabelEntity.id;
            priLogModel.personId = this.genPersonEntity.id;
            priLogModel.serial = i.serial;
            this.priLogList.push(priLogModel);
          }
          this.priLogS.create(this.priLogList).subscribe(resC => {
            if (resC.message === 'OK') {
              if (resC.object != 0) {
                this.data = [];
                this.priLabelModel = new PriLabelModel();
                this.priLabelModel.columns = this.columns;
                this.priLabelModel.rows = [];
                this.count = 0;
                (document.getElementsByName('1') as unknown as HTMLInputElement)[0].focus();
              } else {
                this.alertS.open('Error al crear el log!', 'error');
              }
            } else {
              this.alertS.open(resC.message, 'error');
            }
          }, err => {
            this.alertS.open(err.message, 'error');
          });
        } else {
          this.alertS.open('Error al imprimir!', 'error');
        }
      } else {
        this.alertS.open(resP.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  deleteRow(row: number) {
    this.data.splice(row, 1);
    this.count = this.count - 1;
    this.table.renderRows();
  }

  verfic() {
    this.variableList = [];
    this.fieldList.forEach(element => {
      if (element.automatic == true) {
        this.elements(element);
      }
    });
  }
  elements(element: PriFieldEntity) {
    this.priVariableDetailS.list(element.id).subscribe(res => {
      var identificador = 0;
      var consulta = true;
      var inicio = 0;
      var fin = 0;
      var dato = "";
      var identificador2 = 0;
      var consulta2 = true;
      var inicio2 = 0;
      var fin2 = 0;
      var datos = ""
      var dato = "";
      var datas = ""
      this.priVariableValueM = res.object;
      this.priVariableValueModel = res.object
      this.priVariableValueM.map(vars => {
        this.priVariableValueM = res.object
        if (consulta) {
          if (vars.value == '(') {
            inicio = identificador;
          } else if (vars.value == ')') {
            fin = identificador;
            consulta = false;
          }
          identificador++;
        }
        if (consulta2) {
          if (vars.value == '(') {
            inicio2 = identificador2;
          } else if (vars.value == ')') {
            fin2 = identificador2;
            consulta2 = false;
          }
          identificador2++;
        }
      });
      var start = 0
      for (let i = start; i < inicio; i++) {
        if (this.priVariableValueM[i].type == 'Automatic') {
          dato = dato + ((document.getElementById("" + this.priVariableValueM[i].variableId) as HTMLInputElement).value);
        } else
          if (this.priVariableValueM[i].type == 'Variable') {
            if (this.priVariableValueM[i].description === 'Hexa dos digitos') {
              dato = dato;
              var resA = dato.match(/[A-Za-z0-9_]+/g);
              for (var p = 0; p < resA.length; p++) {
                var input = resA[p].substring(resA[p].length - 2, resA[p].length);
                var data = dato.replace(resA[p], input);
              }
              var dator = Number(data)
              var num = 2;
              var sum = (dator + num);
              var hexa = new Number(sum);
              var hexe = hexa.toString(16);
              var hexaD = String(hexe);
              var varsL = hexaD;

              dato = dato + varsL;
            } else
              if (this.priVariableValueM[i].description === 'Hexa un digito') {
                dato = dato;
                var resA = dato.match(/[A-Za-z0-9_]+/g);
                for (var p = 0; p < resA.length; p++) {
                  var input = resA[p].substring(resA[p].length - 1, resA[p].length);
                  var data = dato.replace(resA[p], input);
                }
                var dator = Number(data)
                var num = 1;
                var sum = (dator + num);
                var hexa = new Number(sum);
                var hexe = hexa.toString(16);
                var hexaD = String(hexe);
                var varsL = hexaD;
                dato = dato + varsL;
              } else if (this.priVariableValueM[i].description === 'Hexa cinco digitos') {
                dato = dato;
                var resA = dato.match(/[A-Za-z0-9_]+/g);
                for (var p = 0; p < resA.length; p++) {
                  var input = resA[p].substring(resA[p].length - 1, resA[p].length);
                  var data = dato.replace(resA[p], input);
                }
                var dator = Number(data)
                var num = 5;
                var sum = (dator + num);
                var hexa = new Number(sum);
                var hexe = hexa.toString(16);
                var hexaD = String(hexe);
                var varsL = hexaD;
                dato = dato + varsL;
              }
              else
                if (this.priVariableValueM[i].description === '0000') {
                  dato = dato;
                  var se = String(0) + String(0) + String(0) + String(0);
                  var sume = dato + se;
                  dato = dato + sume;
                } else
                  if (this.priVariableValueM[i].description === '4 ultimos digitos') {
                    dato = dato;
                    var data = dato;
                    var resL = data.match(/[A-Za-z0-9_]+/g);
                    for (var p = 0; p < resL.length; p++) {
                      var input = resL[p].substring(resL[p].length - 4, resL[p].length);
                      data = data.replace(resL[p], input);
                    }
                    this.globalOne = data
                    dato = data;
                  } else
                    if (this.priVariableValueM[i].description === '16 ultimos digitos') {
                      dato = dato;
                      var data = dato;
                      var resL = data.match(/[A-Za-z0-9_]+/g);
                      for (var p = 0; p < resL.length; p++) {
                        var input = resL[p].substring(resL[p].length - 16, resL[p].length);
                        data = data.replace(resL[p], input);
                      }
                      this.globalTwo = data;
                      dato = data;
                    } else
                      if (this.priVariableValueM[i].description === '6 ultimos digitos') {
                        dato = dato;
                        var data = dato;
                        var resL = data.match(/[A-Za-z0-9_]+/g);
                        for (var p = 0; p < resL.length; p++) {
                          var input = resL[p].substring(resL[p].length - 6, resL[p].length);
                          data = data.replace(resL[p], input);
                        }
                        this.globalThree = data;
                        dato = data;
                      } else
                        if (this.priVariableValueM[i].description === 'concat') {

                          if (this.globalOne != '') {
                            dato = dato + this.globalOne
                          }
                          if (this.globalTwo != '') {
                            dato = dato + this.globalTwo
                          }
                          if (this.globalThree != '') {
                            dato = dato + this.globalThree
                          }
                        }
            datas = dato + this.priVariableValueM[i].value;
          }
      }

      for (let i = inicio; i < fin; i++) {
        if (this.priVariableValueM[i].type == 'Automatic') {
          dato = dato + ((document.getElementById("" + this.priVariableValueM[i].variableId) as HTMLInputElement).value);
        } else
          if (this.priVariableValueM[i].type == 'Variable') {
            if (this.priVariableValueM[i].description === 'Hexa dos digitos') {
              dato = dato;
              var resA = dato.match(/[A-Za-z0-9_]+/g);
              for (var p = 0; p < resA.length; p++) {
                var input = resA[p].substring(resA[p].length - 2, resA[p].length);
                var data = dato.replace(resA[p], input);
              }
              var dator = Number(data)
              var num = 2;
              var sum = (dator + num);
              var hexa = new Number(sum);
              var hexe = hexa.toString(16);
              var hexaD = String(hexe);
              var varsL = hexaD;
              dato = dato + varsL;
            } else
              if (this.priVariableValueM[i].description === 'Hexa un digito') {
                dato = dato;
                var resA = dato.match(/[A-Za-z0-9_]+/g);
                for (var p = 0; p < resA.length; p++) {
                  var input = resA[p].substring(resA[p].length - 1, resA[p].length);
                  var data = dato.replace(resA[p], input);
                }
                var dator = Number(data)
                var num = 1;
                var sum = (dator + num);
                var hexa = new Number(sum);
                var hexe = hexa.toString(16);
                var hexaD = String(hexe);
                var varsL = hexaD;
                dato = dato + varsL;
              } else if (this.priVariableValueM[i].description === 'Hexa cinco digitos') {
                dato = dato;
                var resA = dato.match(/[A-Za-z0-9_]+/g);
                for (var p = 0; p < resA.length; p++) {
                  var input = resA[p].substring(resA[p].length - 1, resA[p].length);
                  var data = dato.replace(resA[p], input);
                }
                var dator = Number(data)
                var num = 5;
                var sum = (dator + num);
                var hexa = new Number(sum);
                var hexe = hexa.toString(16);
                var hexaD = String(hexe);
                var varsL = hexaD;
                dato = dato + varsL;
              }
              else
                if (this.priVariableValueM[i].description === '0000') {
                  dato = dato;
                  var se = String(0) + String(0) + String(0) + String(0);
                  var sume = dato + se;
                  dato = dato + sume;
                } else
                  if (this.priVariableValueM[i].description === '4 ultimos digitos') {
                    dato = dato;
                    var data = dato;
                    var resL = data.match(/[A-Za-z0-9_]+/g);
                    for (var p = 0; p < resL.length; p++) {
                      var input = resL[p].substring(resL[p].length - 4, resL[p].length);
                      data = data.replace(resL[p], input);
                      this.globalOne = data;
                    }
                    this.globalOne = data;
                    console.log(this.globalOne)
                    dato = data;
                  } else
                    if (this.priVariableValueM[i].description === '16 ultimos digitos') {
                      dato = dato;
                      var data = dato;
                      var resL = data.match(/[A-Za-z0-9_]+/g);
                      for (var p = 0; p < resL.length; p++) {
                        var input = resL[p].substring(resL[p].length - 16, resL[p].length);
                        data = data.replace(resL[p], input);
                      }
                      dato = data;
                    } else
                      if (this.priVariableValueM[i].description === '6 ultimos digitos') {
                        dato = dato;
                        var data = dato;
                        var resL = data.match(/[A-Za-z0-9_]+/g);
                        for (var p = 0; p < resL.length; p++) {
                          var input = resL[p].substring(resL[p].length - 6, resL[p].length);
                          data = data.replace(resL[p], input);
                        }
                        dato = data;
                      }
            if (this.priVariableValueM[i].description === 'concat') {
              if (this.globalOne != '') {
                dato = dato + this.globalOne
              }
              if (this.globalTwo != '') {
                dato = dato + this.globalTwo
              }
              if (this.globalThree != '') {
                dato = dato + this.globalThree
              }
            }
            dato = datas + dato;
          }

      }
      for (let i = fin; i < this.priVariableValueM.length; i++) {
        if (this.priVariableValueM[i].type == 'Automatic') {
          dato = dato + ((document.getElementById("" + this.priVariableValueM[i].variableId) as HTMLInputElement).value);
        } else
          if (this.priVariableValueM[i].type == 'Variable') {
            if (this.priVariableValueM[i].description === 'Hexa dos digitos') {
              dato = dato;
              var resA = dato.match(/[A-Za-z0-9_]+/g);
              for (var p = 0; p < resA.length; p++) {
                var input = resA[p].substring(resA[p].length - 2, resA[p].length);
                var data = dato.replace(resA[p], input);
              }
              var dator = Number(data)
              var num = 2;
              var sum = (dator + num);
              var hexa = new Number(sum);
              var hexe = hexa.toString(16);
              var hexaD = String(hexe);
              var varsL = hexaD;
              dato = dato + varsL;
            } else
              if (this.priVariableValueM[i].description === 'Hexa un digito') {
                dato = dato;
                var resA = dato.match(/[A-Za-z0-9_]+/g);
                for (var p = 0; p < resA.length; p++) {
                  var input = resA[p].substring(resA[p].length - 1, resA[p].length);
                  var data = dato.replace(resA[p], input);
                }
                var dator = Number(data)
                var num = 1;
                var sum = (dator + num);
                var hexa = new Number(sum);
                var hexe = hexa.toString(16);
                var hexaD = String(hexe);
                var varsL = hexaD;
                dato = dato + varsL;
              } else if (this.priVariableValueM[i].description === 'Hexa cinco digitos') {
                dato = dato;
                var resA = dato.match(/[A-Za-z0-9_]+/g);
                for (var p = 0; p < resA.length; p++) {
                  var input = resA[p].substring(resA[p].length - 1, resA[p].length);
                  var data = dato.replace(resA[p], input);
                }
                var dator = Number(data)
                var num = 5;
                var sum = (dator + num);
                var hexa = new Number(sum);
                var hexe = hexa.toString(16);
                var hexaD = String(hexe);
                var varsL = hexaD;
                dato = dato + varsL;
              } else
                if (this.priVariableValueM[i].description === '0000') {
                  dato = dato;
                  var se = String(0) + String(0) + String(0) + String(0);
                  var sume = dato + se;
                  dato = dato + sume;
                } else
                  if (this.priVariableValueM[i].description === '4 ultimos digitos') {
                    dato = dato;
                    var data = dato;
                    var resL = data.match(/[A-Za-z0-9_]+/g);
                    for (var p = 0; p < resL.length; p++) {
                      var input = resL[p].substring(resL[p].length - 4, resL[p].length);
                      data = data.replace(resL[p], input);
                    }
                    this.globalOne = data;
                    dato = data;
                  } else
                    if (this.priVariableValueM[i].description === '16 ultimos digitos') {
                      dato = dato;
                      var data = dato;
                      var resL = data.match(/[A-Za-z0-9_]+/g);
                      for (var p = 0; p < resL.length; p++) {
                        var input = resL[p].substring(resL[p].length - 16, resL[p].length);
                        data = data.replace(resL[p], input);
                      }
                      dato = data;
                    } else
                      if (this.priVariableValueM[i].description === '6 ultimos digitos') {
                        dato = dato;
                        var data = dato;
                        var resL = data.match(/[A-Za-z0-9_]+/g);
                        for (var p = 0; p < resL.length; p++) {
                          var input = resL[p].substring(resL[p].length - 6, resL[p].length);
                          data = data.replace(resL[p], input);
                        }
                        dato = data;
                      }
            if (this.priVariableValueM[i].description === 'concat') {
              dato = dato + this.globalOne
              console.log(dato)
            }
            dato = dato + this.priVariableValueM[i].value;
          }
      }
      (document.getElementById("" + element.id) as HTMLInputElement).value = dato;
    });
  }

  deleteSeries(){
    this.priLabelS.deleteSeries().subscribe(resD =>{
      if(resD.message === 'OK'){
          if(resD.object != 0){
          }else{
          }
      }else{  
      }
    },err =>{
    })
  }

}
