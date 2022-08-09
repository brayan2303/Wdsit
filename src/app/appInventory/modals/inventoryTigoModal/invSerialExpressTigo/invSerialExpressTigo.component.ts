import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableExporterDirective } from "mat-table-exporter";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { FormGroup } from "@angular/forms";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { InformationInvComponent } from "src/app/shared/components/informationInv/informationInv.component";
import { InvMasterSerialTigoEntity } from "src/app/appInventory/entities/invMasterSerialTigo.entity";
import { InvMasterInitTigoService } from "src/app/appInventory/services/invMasterInitTigo.service";
import { InvMasterSerialTigoService } from "src/app/appInventory/services/invMasterSerialTigo.service";

@Component({
  selector: 'modal-invSerialExpressTigo',
  templateUrl: './invSerialExpressTigo.component.html',
  styleUrls: ['./invSerialExpressTigo.component.css']
})

export class InvSerialExpressTigoComponent implements OnInit {
  uploading: boolean;
  loading: boolean;
  columns: string[];
  header: string[];
  qr: boolean;
  @ViewChild('serials') searchElement: ElementRef;
  @ViewChild('macs') searchElementM: ElementRef;
  dataSource: MatTableDataSource<any>;
  dataSourceSearch: MatTableDataSource<any>;
  @ViewChild(MatTableExporterDirective, { static: true }) exporter: MatTableExporterDirective;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  fileType: string;
  genPersonEntity: GenPersonEntity;
  InvMasterSerialTigoEntity: InvMasterSerialTigoEntity;
  form: FormGroup;
  serial: string;
  mac: string;
  total1: string;
  total2: string;
  total3: string;
  total4: string;
  total5: string;
  dataAll: any[];

  constructor(private InvMasterInitS: InvMasterInitTigoService, private InvMasterSerialS: InvMasterSerialTigoService, private alertS: AlertService, private dialog: MatDialog, public dialogRef: MatDialogRef<InvSerialExpressTigoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loading = false;
    this.columns = ['serial', 'mac', 'location', 'codigoSap', 'typology', 'status', 'pallet', 'active', 'Acciones']
    this.dataSource = new MatTableDataSource([]);
    this.dataSourceSearch = new MatTableDataSource([]);
    dialogRef.disableClose = true;
    this.serial = '';
    this.mac = '';
    this.InvMasterSerialTigoEntity = new InvMasterSerialTigoEntity();
    this.total1 = '';
    this.total2 = '';
    this.total3 = '';
    this.total4 = '';
    this.total5 = '';
    this.dataAll = [];
  }

  ngOnInit(): void {
    console.log(this.data.codigoSap)

    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.list();
    this.data.id
    this.getExito();
    this.getFaltante();
    this.getNovedades();
    this.getSobrantes();
  }

  focusMac(event) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      if (this.qr) {
        var serialQr = (document.getElementById('serial') as HTMLInputElement).value;
        console.log(serialQr);
        var x = serialQr.normalize('NFD').replace(/\p{Diacritic}/gu, ';');
        var z = x;
        var j = z.replace('?', ';');
        if (j.split(';').length > 1) {
          this.serial = j.split(';')[j.split(';').length - 1];
          this.mac = j.split(';')[j.split(';').length - 2];
        } else {
          (document.getElementById('mac') as HTMLInputElement).value = (document.getElementById('serial') as HTMLInputElement).value;
        }
        this.validador(event);
      } else {
        const input: HTMLInputElement = this.searchElementM.nativeElement as HTMLInputElement;
        input.value = '';
        input.focus();
        input.select();
      }
    }
  }

  validadorSerial(event: KeyboardEvent) {
    if (event.key == 'Enter' || event.key == 'Tab') {
      if (event.key === 'Tab') {
        event.preventDefault();
      }
      const input: HTMLInputElement = this.searchElement.nativeElement as HTMLInputElement;
      var serialQr = (document.getElementById('serial') as HTMLInputElement).value;
      input.value = '';
      input.focus();
      input.select();
      this.save();

    }
  }

  validador(event: KeyboardEvent) {
    if (event.key == 'Enter' || event.key == 'Tab') {
      if (event.key === 'Tab') {
        event.preventDefault();
      } else {
        event.preventDefault();
      }
      const input: HTMLInputElement = this.searchElement.nativeElement as HTMLInputElement;
      var serialQr = (document.getElementById('serial') as HTMLInputElement).value;
      input.value = '';
      input.focus();
      input.select();
      this.save();
    }
  }


  save() {



    if (this.serial != '') {
      if (this.mac != '') {
        var a = this.serial;
        var b = a.replace(/\s/g, '');
        var c = b.replace(/\t/g, '');
        var seriales = c;
        var d = this.mac
        var e = d.replace(/\s/g, '');
        var f = e.replace(/\t/g, '');
        var e = f.replace(/n/gi, '');
        var macs = e;
        this.serial = '';
        this.mac = '';
        this.InvMasterInitS.validationCodSap(this.data.codigoSap, seriales).subscribe(resVL =>{
          if(resVL.message === 'OK'){
            this.InvMasterSerialTigoEntity = resVL.object;
            var serialValidation = this.InvMasterSerialTigoEntity.validation;
            if(serialValidation != '' && serialValidation != null){
              this.InvMasterSerialS.validationSerial(seriales).subscribe(resV => {
                if (resV.message === 'OK') {
                  this.InvMasterSerialTigoEntity = resV.object;
                  if (this.InvMasterSerialTigoEntity.validation != 'NO') {
                    this.InvMasterSerialS.validationRRSerial(serialValidation).subscribe(resS => {
                      if (resS.message === 'OK') {
                        this.InvMasterSerialTigoEntity = resS.object;
                        if (this.InvMasterSerialTigoEntity.validation != 'NO') {
                          this.InvMasterSerialS.validationRR(serialValidation, this.data.codigoSap).subscribe(resR => {
                            if (resR.message === 'OK') {
                              this.InvMasterSerialTigoEntity = resR.object;
                              if (this.InvMasterSerialTigoEntity.validation != 'NO') {
                                this.InvMasterSerialS.create(seriales, macs, this.genPersonEntity.id, 'EXITO', this.data.id).subscribe(resC => {
                                  if (resC.message === 'OK') {
                                    if (resC.object != 0) {
                                      this.alertS.open('Serial ingresado!', 'success');
                                      this.list();
                                      this.getExito();
                                      this.getFaltante();
                                      this.getNovedades();
                                      this.getSobrantes();
                                      this.showTable('EXITO');
                                      this.mac = '';
                                    } else {
                                      this.alertS.open(resC.message, 'error');
                                    }
                                  } else {
                                    this.alertS.open(resC.message, 'error');
                                  }
                                }, err => {
                                  this.alertS.open(err.message, 'error');
                                })
 
                              } else {
                                this.InvMasterSerialS.create(seriales, macs, this.genPersonEntity.id, 'NOVEDADES CODIGO SAP', this.data.id).subscribe(resCRR => {
                                  if (resCRR.message === 'OK') {
                                    if (resCRR.object != 0) {
                                      var information = this.dialog.open(InformationInvComponent, {
                                        data: { message: 'El serial se encuentra en NOVEDAD en CODIGO SAP' },
                                      });
                                      this.list();
                                      this.getExito();
                                      this.getFaltante();
                                      this.getNovedades();
                                      this.getSobrantes();
                                      this.mac = '';
                                    } else {
                                      this.alertS.open(resCRR.message, 'error');
                                    }
                                  } else {
                                    this.alertS.open(resCRR.message, 'error');
                                  }
                                }, err => {
                                  this.alertS.open(err.message, 'error');
                                })
      
                              }
                            } else {
                              this.alertS.open(resR.message, 'error');
                            }
                          }, err => {
                            this.alertS.open(err.message, 'error');
                          });
                        } else {
                          this.InvMasterSerialS.create(seriales, macs, this.genPersonEntity.id, 'NOVEDADES IQ', this.data.id).subscribe(resCRR => {
                            if (resCRR.message === 'OK') {
                              if (resCRR.object != 0) {
                                var information = this.dialog.open(InformationInvComponent, {
                                  data: { message: 'El serial NO se encuentra en IQ09' },
                                });
                                this.list();
                                this.getExito();
                                this.getFaltante();
                                this.getNovedades();
                                this.getSobrantes();
                                this.mac = '';
                              } else {
                                this.alertS.open(resCRR.message, 'error');
                              }
                            } else {
                              this.alertS.open(resCRR.message, 'error');
                            }
                          }, err => {
                            this.alertS.open(err.message, 'error');
                          })
                        }
                      } else {
                        this.alertS.open(resS.message, 'error');
                      }
                    })
      
                  } else {
                    this.alertS.open('El serial ya se encuentra registrado', 'warning');
                    var information = this.dialog.open(InformationInvComponent, {
                      data: { message: 'El serial ya se encuentra registrado' },
                    });
                    this.InvMasterSerialS.create(seriales, macs, this.genPersonEntity.id, 'NOVEDADES DUPLICADO', this.data.id).subscribe(resCN => {
                      if (resCN.message === 'OK') {
                        if (resCN.object != 0) {
                          this.list();
                          this.getExito();
                          this.getFaltante();
                          this.getNovedades();
                          this.getSobrantes();
                          this.mac = '';
                        } else {
                          this.alertS.open(resCN.message, 'error');
                        }
                      } else {
                        this.alertS.open(resCN.message, 'error');
                      }
                    }, err => {
                      this.alertS.open(err.message, 'error');
                    })
                  }
                } else {
                  this.alertS.open(resV.message, 'warning');
                }
              }, err => {
                this.alertS.open(err.message, 'error');
              });
    
            }else{
              this.InvMasterSerialS.validationSerial(seriales).subscribe(resV => {
                console.log(seriales);
                if (resV.message === 'OK') {
                  this.InvMasterSerialTigoEntity = resV.object;
                  if (this.InvMasterSerialTigoEntity.validation != 'NO') {
                    this.InvMasterSerialS.validationRRSerial(seriales).subscribe(resS => {
                      console.log(seriales);
                      if (resS.message === 'OK') {
                        this.InvMasterSerialTigoEntity = resS.object;
                        if (this.InvMasterSerialTigoEntity.validation != 'NO') {
                          this.InvMasterSerialS.validationRR(seriales, this.data.codigoSap).subscribe(resR => {
                            if (resR.message === 'OK') {
                              this.InvMasterSerialTigoEntity = resR.object;
                              if (this.InvMasterSerialTigoEntity.validation != 'NO') {
                                this.InvMasterSerialS.create(seriales, macs, this.genPersonEntity.id, 'EXITO', this.data.id).subscribe(resC => {
                                  if (resC.message === 'OK') {
                                    if (resC.object != 0) {
                                      this.alertS.open('Serial ingresado!', 'success');
                                      this.list();
                                      this.getExito();
                                      this.getFaltante();
                                      this.getNovedades();
                                      this.getSobrantes();
                                      this.showTable('EXITO');
                                      this.mac = '';
                                    } else {
                                      this.alertS.open(resC.message, 'error');
                                    }
                                  } else {
                                    this.alertS.open(resC.message, 'error');
                                  }
                                }, err => {
                                  this.alertS.open(err.message, 'error');
                                })
                              } else {
                                this.InvMasterSerialS.create(seriales, macs, this.genPersonEntity.id, 'NOVEDADES CODIGO SAP', this.data.id).subscribe(resCRR => {
                                  if (resCRR.message === 'OK') {
                                    if (resCRR.object != 0) {
                                      var information = this.dialog.open(InformationInvComponent, {
                                        data: { message: 'El serial se encuentra en NOVEDAD en CODIGO SAP' },
                                      });
                                      this.list();
                                      this.getExito();
                                      this.getFaltante();
                                      this.getNovedades();
                                      this.getSobrantes();
                                      this.mac = '';
                                    } else {
                                      this.alertS.open(resCRR.message, 'error');
                                    }
                                  } else {
                                    this.alertS.open(resCRR.message, 'error');
                                  }
                                }, err => {
                                  this.alertS.open(err.message, 'error');
                                })
                              }
                            } else {
                              this.alertS.open(resR.message, 'error');
                            }
                          }, err => {
                            this.alertS.open(err.message, 'error');
                          });
      
                        } else {
                          this.InvMasterSerialS.create(seriales, macs, this.genPersonEntity.id, 'NOVEDADES IQ', this.data.id).subscribe(resCRR => {
                            if (resCRR.message === 'OK') {
                              if (resCRR.object != 0) {
                                var information = this.dialog.open(InformationInvComponent, {
                                  data: { message: 'El serial NO se encuentra en IQ09' },
                                });
                                this.list();
                                this.getExito();
                                this.getFaltante();
                                this.getNovedades();
                                this.getSobrantes();
                                this.mac = '';
                              } else {
                                this.alertS.open(resCRR.message, 'error');
                              }
                            } else {
                              this.alertS.open(resCRR.message, 'error');
                            }
                          }, err => {
                            this.alertS.open(err.message, 'error');
                          })
                        }
                      } else {
                        this.alertS.open(resS.message, 'error');
                      }
                    })
      
                  } else {
                    this.alertS.open('El serial ya se encuentra registrado', 'warning');
                    var information = this.dialog.open(InformationInvComponent, {
                      data: { message: 'El serial ya se encuentra registrado' },
                    });
                    this.InvMasterSerialS.create(seriales, macs, this.genPersonEntity.id, 'NOVEDADES DUPLICADO', this.data.id).subscribe(resCN => {
                      if (resCN.message === 'OK') {
                        if (resCN.object != 0) {
                          this.list();
                          this.getExito();
                          this.getFaltante();
                          this.getNovedades();
                          this.getSobrantes();
                          this.mac = '';
                        } else {
                          this.alertS.open(resCN.message, 'error');
                        }
                      } else {
                        this.alertS.open(resCN.message, 'error');
                      }
                    }, err => {
                      this.alertS.open(err.message, 'error');
                    })
                  }
                } else {
                  this.alertS.open(resV.message, 'warning');
                }
              }, err => {
                this.alertS.open(err.message, 'error');
              });
    
            }
    
          }else{
            this.alertS.open(resVL.message, 'error');
          }
        })
      

      } else {
        this.alertS.open('¡Por favor ingrese la mac!', 'warning');
      }

    } else {

      this.alertS.open('¡Por favor ingrese un serial!', 'warning');
    }

  }
  list() {
    this.InvMasterSerialS.list(this.data.id).subscribe(res => {
      if (res.message === "OK") {
        this.dataAll = [];
        this.loading = false;
        this.dataAll = res.object;
        this.showTable('EXITO');
      } else {
        this.alertS.open(res.message, 'error')
      }
    }, err => {
      this.alertS.open(err.message, 'error')

    }
    )
  }

  showTable(status: string) {
    this.dataAll;
    var search: any;
    search = [];

    for (let i = 0; i < this.dataAll.length; i++) {
      if (this.dataAll[i].status == status) {
        search.push(this.dataAll[i]);
      } else if (status == 'NOVEDAD') {
        if (this.dataAll[i].status == 'NOVEDADES IQ' || this.dataAll[i].status == 'NOVEDADES DUPLICADO' || this.dataAll[i].status == 'NOVEDADES CODIGO SAP') {
          search.push(this.dataAll[i]);
        }
      }
    }

    this.dataSource = new MatTableDataSource<any>(search);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(value: number) {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿ Desea eliminar el registro ?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
        this.InvMasterSerialS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Registro eliminado!', 'success');
              this.getExito();
              this.getFaltante();
              this.getNovedades();
              this.getSobrantes();
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
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  close(): void {
    this.dialogRef.close();
  }
  init() {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿ Desea finalizar el conteo ?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
        this.InvMasterSerialS.update(this.data.id).subscribe(resL => {
          if (resL.message === 'OK') {
            this.alertS.open('Conteo finalizado!', 'success');
            this.close();
          } else {
            this.alertS.open(resL.message, 'warning')
          }
        })
      }
    })
  }

  getNovedades() {
    this.InvMasterInitS.serialCount('NOVEDADES', this.data.id).subscribe(resP => {
      if (resP.message === 'OK') {
        this.InvMasterSerialTigoEntity = resP.object;
        this.total1 = this.InvMasterSerialTigoEntity.total
      } else {
        this.alertS.open(resP.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  getFaltante() {
    this.InvMasterInitS.serialCount('FALTANTES', this.data.id).subscribe(resP => {
      if (resP.message === 'OK') {
        this.InvMasterSerialTigoEntity = resP.object;
        this.total2 = this.InvMasterSerialTigoEntity.total
      } else {
        this.alertS.open(resP.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  getSobrantes() {
    this.InvMasterInitS.serialCount('SOBRANTES', this.data.id).subscribe(resP => {
      if (resP.message === 'OK') {
        this.InvMasterSerialTigoEntity = resP.object;
        this.total3 = this.InvMasterSerialTigoEntity.total
      } else {
        this.alertS.open(resP.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  getExito() {
    this.InvMasterInitS.serialCount('EXITO', this.data.id).subscribe(resP => {
      if (resP.message === 'OK') {
        this.InvMasterSerialTigoEntity = resP.object;
        this.total4 = this.InvMasterSerialTigoEntity.total
      } else {
        this.alertS.open(resP.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

}

