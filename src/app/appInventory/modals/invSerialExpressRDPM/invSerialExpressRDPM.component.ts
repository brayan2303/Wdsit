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
import { InvMasterSerialService } from "../../services/invMasterSerial.service";
import { InvMasterSerialEntity } from "../../entities/invMasterSerial.entity";
import { InformationInvComponent } from "src/app/shared/components/informationInv/informationInv.component";
import { InvMasterInitService } from "../../services/invMasterInit.service";

@Component({
  selector: 'modal-invSerialExpressRDPM',
  templateUrl: './invSerialExpressRDPM.component.html',
  styleUrls: ['./invSerialExpressRDPM.component.css']
})

export class InvSerialExpressRDPMComponent implements OnInit {
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
  InvMasterSerialEntity: InvMasterSerialEntity;
  form: FormGroup;
  serial: string;
  mac: string;
  total1: string;
  total2: string;
  total3: string;
  total4: string;
  total5: string;
  dataAll: any[];

  constructor(private InvMasterInitS: InvMasterInitService, private InvMasterSerialS: InvMasterSerialService, private alertS: AlertService, private dialog: MatDialog, public dialogRef: MatDialogRef<InvSerialExpressRDPMComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loading = false;
    this.columns = ['serial', 'mac', 'location', 'codigoSap', 'typology', 'status', 'pallet', 'active', 'Acciones']
    this.dataSource = new MatTableDataSource([]);
    this.dataSourceSearch = new MatTableDataSource([]);
    dialogRef.disableClose = true;
    this.serial = '';
    this.mac = '';
    this.InvMasterSerialEntity = new InvMasterSerialEntity();
    this.total1 = '';
    this.total2 = '';
    this.total3 = '';
    this.total4 = '';
    this.total5 = '';
    this.dataAll = [];
  }

  ngOnInit(): void {
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
        var n = serialQr.slice(19,30);
        this.serial = n;
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
      input.value = '';
      input.focus();
      input.select();
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
      input.value = '';
      input.focus();
      input.select();
      this.save();
    }
  }


  save() {
    if (this.serial != '') {
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
      this.InvMasterSerialS.validationSerial(seriales).subscribe(resV => {
        if (resV.message === 'OK') {
          this.InvMasterSerialEntity = resV.object;
          if (this.InvMasterSerialEntity.validation != 'NO') {
            this.InvMasterSerialS.validationMissing(seriales).subscribe(resM => {
              if (resM.message === 'OK') {
                this.InvMasterSerialEntity = resM.object;
                if (this.InvMasterSerialEntity.validation != 'NO') {
                  this.InvMasterSerialS.validationSpare(seriales).subscribe(resP => {
                    if (resP.message === 'OK') {
                      this.InvMasterSerialEntity = resP.object;
                      if (this.InvMasterSerialEntity.validation != 'NO') {
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
                        var information = this.dialog.open(InformationInvComponent, {
                          data: { message: 'El serial se encuentra en SOBRANTES' },
                        });
                        this.InvMasterSerialS.create(seriales, macs, this.genPersonEntity.id, 'SOBRANTES', this.data.id).subscribe(resCS => {
                          if (resCS.message === 'OK') {
                            if (resCS.object != 0) {
                              this.list();
                              this.getExito();
                              this.getFaltante();
                              this.getNovedades();
                              this.getSobrantes();
                              this.mac = '';
                            } else {
                              this.alertS.open(resCS.message, 'error');
                            }
                          } else {
                            this.alertS.open(resCS.message, 'error');
                          }
                        }, err => {
                          this.alertS.open(err.message, 'error');
                        })
                      }
                    } else {
                      this.alertS.open(resP.message, 'error');
                    }
                  }, err => {
                    this.alertS.open(err.message, 'error');
                  })

                } else {
                  var information = this.dialog.open(InformationInvComponent, {
                    data: { message: 'El serial se encuentra en FALTANTES' },
                  });
                  this.InvMasterSerialS.create(seriales, macs, this.genPersonEntity.id, 'FALTANTES', this.data.id).subscribe(resCF => {
                    if (resCF.message === 'OK') {
                      if (resCF.object != 0) {
                        this.list();
                        this.getExito();
                        this.getFaltante();
                        this.getNovedades();
                        this.getSobrantes();
                        this.mac = '';
                      } else {
                        this.alertS.open(resCF.message, 'error');
                      }
                    } else {
                      this.alertS.open(resCF.message, 'error');
                    }
                  }, err => {
                    this.alertS.open(err.message, 'error');
                  })
                }
              } else {
                this.alertS.open(resM.message, 'error')
              }
            }, err => {
              this.alertS.open(err.message, 'error');
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
        if (this.dataAll[i].status == 'NOVEDADES RR' || this.dataAll[i].status == 'NOVEDADES DUPLICADO' || this.dataAll[i].status == 'NOVEDADES CODIGO SAP') {
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
        this.InvMasterSerialEntity = resP.object;
        this.total1 = this.InvMasterSerialEntity.total
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
        this.InvMasterSerialEntity = resP.object;
        this.total2 = this.InvMasterSerialEntity.total
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
        this.InvMasterSerialEntity = resP.object;
        this.total3 = this.InvMasterSerialEntity.total
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
        this.InvMasterSerialEntity = resP.object;
        this.total4 = this.InvMasterSerialEntity.total
      } else {
        this.alertS.open(resP.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

}
