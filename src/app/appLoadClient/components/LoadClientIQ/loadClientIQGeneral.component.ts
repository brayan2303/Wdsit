import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MatPaginator } from "@angular/material/paginator";
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { LoadPersonCustomerService } from '../../services/loadPersonCustomer.service';
import { LoadClientParameterizationService } from '../../services/LoadClientParameterization.service';
import { LoadClientParameterizationModel } from "../../models/LoadClientParameterization.model";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-loadClientIQGeneral',
  templateUrl: './loadClientIQGeneral.component.html',
  styleUrls: ['./loadClientIQGeneral.component.css']
})

export class LoadClientIQGeneralComponent implements OnInit {
  uploading: boolean;
  validation: boolean;
  loading: boolean;
  columns: string[];
  fileList: File[];
  header: string[];
  dataSource: MatTableDataSource<any>;
  public listCustomers: GenCustomerEntity[];
  private _alertService: AlertService
  @ViewChild('paginator') paginator: MatPaginator;
  person: GenPersonEntity;
  loadId: number;
  countryId: number;
  customer: GenCustomerEntity;
  customerList: GenCustomerEntity[];
  countryList: GenCountryEntity[];
  subtitle: string;
  subtitleValidation: string;
  validationA: boolean;
  LoadClientParameterizationM: LoadClientParameterizationModel;
  @Inject(MAT_DIALOG_DATA) public data: any
  @ViewChild(MatSort) sort: MatSort;
  opcionSeleccionado: number = 0;
  verSeleccion: number = 0;
  value: number = 0;

  constructor(private LoadClientParameterizationS: LoadClientParameterizationService, private alertS: AlertService, private loadCustomerPersoS: LoadPersonCustomerService) {
    this.loading = false;
    this.columns = ['serialCustomer', 'annexCustomer'];
    this.header = ['serialCustomer', 'annexCustomer'];
    this.dataSource = new MatTableDataSource([]);
    this.loadId = 0;
    this.uploading = false;
    this.fileList = [];
    this.customer = new GenCustomerEntity();
    this.countryId = 0;
    this.person = new GenPersonEntity();
    this.subtitle = '';
    this.validation = true;
    this.subtitleValidation = '';
    this.validationA = false;
    this.LoadClientParameterizationM = new LoadClientParameterizationModel();
  }
  ngOnInit(): void {
    this.loading = true;
    this.person = JSON.parse(localStorage.getItem('user'));
    this.LoadClientParameterizationS.findByClaro().subscribe(res => {
      if (res.message === 'OK') {
        this.customer = res.object;
      } else { this.alertS.open(res.message, 'error'); }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    this.count();
    this.list();
    this.customerSelect();

  }

  customerSelect() {
    this.loading = true;
    this.person = JSON.parse(localStorage.getItem('user'));
    this.loadCustomerPersoS.findCustomerByPersonIdList(Number(JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res => {
      if (res.message === 'OK') {
        this.customerList = res.object;

      } else { this.alertS.open(res.message, 'error'); }
    }, err => {
      this.alertS.open(err.message, 'error');
    })

  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
    this.list();
    this.count();
  }


  list() {
    if (this.opcionSeleccionado == 2) {
      this.LoadClientParameterizationS.claroList().subscribe(res => {
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
    } else if (this.opcionSeleccionado == 60) {
      this.LoadClientParameterizationS.redExternaList().subscribe(res => {
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
    } else if (this.opcionSeleccionado == 48) {
      this.LoadClientParameterizationS.directvList().subscribe(res => {
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
    } else if (this.opcionSeleccionado == 61) {
      this.LoadClientParameterizationS.plataformaMovilList().subscribe(res => {
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
    } else if (this.opcionSeleccionado == 29) {
      this.LoadClientParameterizationS.hughesList().subscribe(res => {
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
    } else if (this.opcionSeleccionado == 15) {
      this.LoadClientParameterizationS.tigoList().subscribe(res => {
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
    } else if (this.opcionSeleccionado == 5) {
      this.LoadClientParameterizationS.etbList().subscribe(res => {
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
  }


  load() {
    this.capturar();
    this.uploading = true;
    var fecha = new Date();
    var fechaCreacion: string;
    setTimeout(() => {
      this.subtitle = 'Cargando archivo';
    }, 1000);
    fechaCreacion = fecha.getFullYear() + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + ('0' + fecha.getDate()).slice(-2) +' '+ fecha.getHours() +'.'+fecha.getMinutes()+'.'+fecha.getSeconds();
    console.log(fechaCreacion);
    this.LoadClientParameterizationS.loadFile(this.opcionSeleccionado, this.person.id, fechaCreacion, this.fileList).subscribe(resC => {
      if (resC.message === 'OK') {
        if (resC.object != 0) {
          this.validation = false;
          setTimeout(() => {
            this.subtitle = 'Archivo registrado';
          }, 1000);
          this.loading = true;
          setTimeout(() => {
            this.subtitle = 'Archivo cargado';
          }, 1000);
          setTimeout(() => {
            this.subtitle = 'Generar la validacion del archivo';
          }, 1000);

          setTimeout(() => {
            this.uploading = false;
          }, 2000);
        this.LoadClientParameterizationS.loadFileLog(this.opcionSeleccionado, this.person.id, fechaCreacion, this.fileList).subscribe(resM =>{
          if(resM.message === 'OK'){
            if(resM.object !=0){

            }else{
              this.alertS.open(resM.message, 'error');
            }
          }else{
            this.alertS.open(resM.message, 'error');
          }
        },err =>{
            this.alertS.open(err.message, 'error');
        })
        } else {
          this.alertS.open('Error al cargar el archivo!', 'error');
          this.subtitle = 'Error al cargar el archivo! Por favor verificar'
          this.uploading = false;
        }
      } else {
        this.alertS.open(resC.message, 'error');
        this.uploading = false;
        this.subtitle = 'Error al cargar el archivo! Por favor verificar'
      }
    }, err => {
      this.alertS.open(err.message, 'error');
      this.uploading = false;

    });
    (document.getElementById('serials') as HTMLInputElement).value = null;
  }
  addFile(file: FileList) {
    if (file != undefined) {
      for (let i = 0; i < file.length; i++) {
        this.fileList.push(file[i]);
        this.uploading = true;
        this.load();
      }
    }
  }


  create() {
    this.capturar();
    this.value = 0;
    if (this.verSeleccion == 2) { // CLARO
      this.validationA = true;
      setTimeout(() => {
        this.subtitleValidation = 'Validando archivo';
        this.value = 10
      }, 1000);
      this.LoadClientParameterizationS.deleteClaro(this.verSeleccion).subscribe(resD => {
        if (resD.message === 'OK') {
          this.count();
        } else {
          this.alertS.open(resD.message, 'error');
        }
      })
      this.value = 30;
      this.LoadClientParameterizationS.createClaro(this.person.id, this.verSeleccion).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.log(this.person.id,res.message);
            setTimeout(() => {
              this.subtitleValidation = 'Archivo validado';
              this.value = 50;
            }, 1000);
            this.LoadClientParameterizationS.loadClaro(this.verSeleccion).subscribe(resL => {
              if (resL.message === 'OK') {
                if (res.object != 0) {
                  this.count();
                  this.list();
                  this.value = 80;
                  this.LoadClientParameterizationS.deleteFiles(this.verSeleccion).subscribe(resF => {
                    if (resF.message === 'OK') {
                      resL.object = '';
                    } else {
                      this.alertS.open(resF.message, 'error');
                    }
                  }, err => {
                    this.alertS.open(err.message, 'error');
                  });
                } else {
                  this.alertS.open(resL.message, 'error');
                }
              } else {
                this.alertS.open(resL.message, 'error');
              }
            })
            setTimeout(() => {
              this.subtitleValidation = 'Validacion terminada';
              this.value = 100;
            }, 1000);

            setTimeout(() => {
              this.validationA = false;
              this.validation = true;
            }, 2000);

          } else {
            this.alertS.open(res.message, 'error');
            this.subtitleValidation = 'Error al validar archivo';
            this.log(this.person.id,res.message);
            this.validationA = false;
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else if (this.verSeleccion == 5) { //ETB


      this.validationA = true;
      setTimeout(() => {
        this.subtitleValidation = 'Validando archivo';
        this.value = 10
      }, 1000);
      this.LoadClientParameterizationS.deleteEtb(this.verSeleccion).subscribe(resD => {
        if (resD.message === 'OK') {
          this.count();
        } else {
          this.alertS.open(resD.message, 'error');
        }
      })
      this.value = 30
      this.LoadClientParameterizationS.createEtb(this.person.id, this.verSeleccion).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.log(this.person.id,res.message);
            setTimeout(() => {
              this.subtitleValidation = 'Archivo validado';
              this.value = 50;
            }, 1000);
            this.LoadClientParameterizationS.loadEtb(this.verSeleccion).subscribe(resL => {
              if (resL.message === 'OK') {
                if (res.object != 0) {
                  this.count();
                  this.list();
                  this.value = 80;
                  this.LoadClientParameterizationS.deleteFiles(this.verSeleccion).subscribe(resF => {
                    if (resF.message === 'OK') {
                      resL.object = '';
                    } else {
                      this.alertS.open(resF.message, 'error');
                    }
                  }, err => {
                    this.alertS.open(err.message, 'error');
                  });
                } else {
                  this.alertS.open(resL.message, 'error');
                }
              } else {
                this.alertS.open(resL.message, 'error');
              }
            })
            setTimeout(() => {
              this.subtitleValidation = 'Validacion terminada';
              this.value = 100;
            }, 1000);

            setTimeout(() => {
              this.validationA = false;
              this.validation = true;
            }, 2000);

          } else {
            this.alertS.open(res.message, 'error');
            this.subtitleValidation = 'Error al validar archivo';
            this.log(this.person.id,res.message);
            this.validationA = false;
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else if (this.verSeleccion == 15) { //TIGO
      this.validationA = true;
      setTimeout(() => {
        this.subtitleValidation = 'Validando archivo';
        this.value = 10;
      }, 1000);
      this.LoadClientParameterizationS.deleteTigo(this.verSeleccion).subscribe(resD => {
        if (resD.message === 'OK') {
          this.count();
        } else {
          this.alertS.open(resD.message, 'error');
        }
      })
      this.value = 30;
      this.LoadClientParameterizationS.createTigo(this.person.id, this.verSeleccion).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.log(this.person.id,res.message);
            setTimeout(() => {
              this.subtitleValidation = 'Archivo validado';
              this.value = 50;
            }, 1000);
            this.LoadClientParameterizationS.loadTigo(this.verSeleccion).subscribe(resL => {
              if (resL.message === 'OK') {
                if (res.object != 0) {
                  this.count();
                  this.list();
                  this.value = 80;
                  this.LoadClientParameterizationS.deleteFiles(this.verSeleccion).subscribe(resF => {
                    if (resF.message === 'OK') {
                      resL.object = '';
                    } else {
                      this.alertS.open(resF.message, 'error');
                    }
                  }, err => {
                    this.alertS.open(err.message, 'error');
                  });
                } else {
                  this.alertS.open(resL.message, 'error');
                }
              } else {
                this.alertS.open(resL.message, 'error');
              }
            })
            setTimeout(() => {
              this.subtitleValidation = 'Validacion terminada';
              this.value = 100;
            }, 1000);

            setTimeout(() => {
              this.validationA = false;
              this.validation = true;
            }, 2000);

          } else {
            this.alertS.open(res.message, 'error');
            this.subtitleValidation = 'Error al validar archivo';
            this.log(this.person.id,res.message);
            this.validationA = false;
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else if (this.verSeleccion == 29) { //HUGHES

      this.validationA = true;
      setTimeout(() => {
        this.subtitleValidation = 'Validando archivo';
        this.value = 10;
      }, 1000);
      this.LoadClientParameterizationS.deleteHughes(this.verSeleccion).subscribe(resD => {
        if (resD.message === 'OK') {
          this.count();
        } else {
          this.alertS.open(resD.message, 'error');
        }
      })
      this.value = 30;
      this.LoadClientParameterizationS.createHughes(this.person.id, this.verSeleccion).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.log(this.person.id,res.message);
            setTimeout(() => {
              this.subtitleValidation = 'Archivo validado';
              this.value = 50;
            }, 1000);
            this.LoadClientParameterizationS.loadHughes(this.verSeleccion).subscribe(resL => {
              if (resL.message === 'OK') {
                if (res.object != 0) {
                  this.count();
                  this.list();
                  this.value = 80;
                  this.LoadClientParameterizationS.deleteFiles(this.verSeleccion).subscribe(resF => {
                    if (resF.message === 'OK') {
                      resL.object = '';
                    } else {
                      this.alertS.open(resF.message, 'error');
                    }
                  }, err => {
                    this.alertS.open(err.message, 'error');
                  });
                } else {
                  this.alertS.open(resL.message, 'error');
                }
              } else {
                this.alertS.open(resL.message, 'error');
              }
            })
            setTimeout(() => {
              this.subtitleValidation = 'Validacion terminada';
              this.value = 100;
            }, 1000);

            setTimeout(() => {
              this.validationA = false;
              this.validation = true;
            }, 2000);

          } else {
            this.alertS.open(res.message, 'error');
            this.subtitleValidation = 'Error al validar archivo';
            this.log(this.person.id,res.message);
            this.validationA = false;
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else if (this.verSeleccion == 61) {  //PLATAFORMA MOVIL

      this.validationA = true;
      setTimeout(() => {
        this.subtitleValidation = 'Validando archivo';
        this.value = 10;
      }, 1000);
      this.LoadClientParameterizationS.deletePlataformaMovil(this.verSeleccion).subscribe(resD => {
        if (resD.message === 'OK') {
          this.count();
        } else {
          this.alertS.open(resD.message, 'error');
        }
      })
      this.value = 30;
      this.LoadClientParameterizationS.createPlataformaMovil(this.person.id, this.verSeleccion).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.log(this.person.id,res.message);
            setTimeout(() => {
              this.subtitleValidation = 'Archivo validado';
              this.value = 50;
            }, 1000);
            this.LoadClientParameterizationS.loadPlataformaMovil(this.verSeleccion).subscribe(resL => {
              if (resL.message === 'OK') {
                if (res.object != 0) {
                  this.count();
                  this.list();
                  this.value = 80;
                  this.LoadClientParameterizationS.deleteFiles(this.verSeleccion).subscribe(resF => {
                    if (resF.message === 'OK') {
                      resL.object = '';
                    } else {
                      this.alertS.open(resF.message, 'error');
                    }
                  }, err => {
                    this.alertS.open(err.message, 'error');
                  });
                } else {
                  this.alertS.open(resL.message, 'error');
                }
              } else {
                this.alertS.open(resL.message, 'error');
              }
            })
            setTimeout(() => {
              this.subtitleValidation = 'Validacion terminada';
              this.value = 100;
            }, 1000);

            setTimeout(() => {
              this.validationA = false;
              this.validation = true;
            }, 2000);

          } else {
            this.alertS.open(res.message, 'error');
            this.subtitleValidation = 'Error al validar archivo';
            this.log(this.person.id,res.message);
            this.validationA = false;
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else if (this.verSeleccion == 60) { //RED EXTERNA

      this.validationA = true;
      setTimeout(() => {
        this.subtitleValidation = 'Validando archivo';
        this.value = 10;
      }, 1000);
      this.LoadClientParameterizationS.deleteRedExterna(this.verSeleccion).subscribe(resD => {
        if (resD.message === 'OK') {
          this.count();
        } else {
          this.alertS.open(resD.message, 'error');
        }
      })
      this.value = 30;
      this.LoadClientParameterizationS.createRedExterna(this.person.id, this.verSeleccion).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.log(this.person.id,res.message);
            setTimeout(() => {
              this.subtitleValidation = 'Archivo validado';
              this.value = 50;
            }, 1000);
            this.LoadClientParameterizationS.loadRedExterna(this.verSeleccion).subscribe(resL => {
              if (resL.message === 'OK') {
                if (res.object != 0) {
                  this.count();
                  this.list();
                  this.value = 80;
                  this.LoadClientParameterizationS.deleteFiles(this.verSeleccion).subscribe(resF => {
                    if (resF.message === 'OK') {
                      resL.object = '';
                    } else {
                      this.alertS.open(resF.message, 'error');
                    }
                  }, err => {
                    this.alertS.open(err.message, 'error');
                  });
                } else {
                  this.alertS.open(resL.message, 'error');
                }
              } else {
                this.alertS.open(resL.message, 'error');
              }
            })
            setTimeout(() => {
              this.subtitleValidation = 'Validacion terminada';
              this.value = 100;
            }, 1000);

            setTimeout(() => {
              this.validationA = false;
              this.validation = true;
            }, 2000);

          } else {
            this.alertS.open(res.message, 'error');
            this.subtitleValidation = 'Error al validar archivo';
            this.log(this.person.id,res.message);
            this.validationA = false;
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else if (this.verSeleccion == 48) { //DIRECTV

      this.validationA = true;
      setTimeout(() => {
        this.subtitleValidation = 'Validando archivo';
        this.value = 10;
      }, 1000);
      this.LoadClientParameterizationS.deleteDirectv(this.verSeleccion).subscribe(resD => {
        if (resD.message === 'OK') {
          this.count();
        } else {
          this.alertS.open(resD.message, 'error');
        }
      })
      this.value = 30;
      this.LoadClientParameterizationS.createDirectv(this.person.id, this.verSeleccion).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.log(this.person.id,res.message);
            setTimeout(() => {
              this.subtitleValidation = 'Archivo validado';
              this.value = 50;
            }, 1000);
            this.LoadClientParameterizationS.loadDirectv(this.verSeleccion).subscribe(resL => {
              if (resL.message === 'OK') {
                if (res.object != 0) {
                  this.count();
                  this.list();
                  this.value = 80;
                  this.LoadClientParameterizationS.deleteFiles(this.verSeleccion).subscribe(resF => {
                    if (resF.message === 'OK') {
                      resL.object = '';
                    } else {
                      this.alertS.open(resF.message, 'error');
                    }
                  }, err => {
                    this.alertS.open(err.message, 'error');
                  });
                } else {
                  this.alertS.open(resL.message, 'error');
                }
              } else {
                this.alertS.open(resL.message, 'error');
              }
            })
            setTimeout(() => {
              this.subtitleValidation = 'Validacion terminada';
              this.value = 100;
            }, 1000);

            setTimeout(() => {
              this.validationA = false;
              this.validation = true;
            }, 2000);

          } else {
            this.alertS.open(res.message, 'error');
            this.subtitleValidation = 'Error al validar archivo';
            this.log(this.person.id,res.message);
            this.validationA = false;
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    }
    this.fileList = [];
  }

  count() {
    if (this.verSeleccion == 2) { //CLARO
      this.LoadClientParameterizationS.claroCount().subscribe(resC => {
        if (resC.message === 'OK') {
          this.LoadClientParameterizationM = resC.object;
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else if (this.verSeleccion == 5) { //ETB
      this.LoadClientParameterizationS.etbCount().subscribe(resC => {
        if (resC.message === 'OK') {
          this.LoadClientParameterizationM = resC.object;
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else if (this.verSeleccion == 15) { //TIGO
      this.LoadClientParameterizationS.tigoCount().subscribe(resC => {
        if (resC.message === 'OK') {
          this.LoadClientParameterizationM = resC.object;
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else if (this.verSeleccion == 29) { //HUGHES
      this.LoadClientParameterizationS.hughesCount().subscribe(resC => {
        if (resC.message === 'OK') {
          this.LoadClientParameterizationM = resC.object;
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else if (this.verSeleccion == 61) { //PLATAFORMA MOVIL
      this.LoadClientParameterizationS.plataformaMovilCount().subscribe(resC => {
        if (resC.message === 'OK') {
          this.LoadClientParameterizationM = resC.object;
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else if (this.verSeleccion == 60) {
      this.LoadClientParameterizationS.redExternaCount().subscribe(resC => {
        if (resC.message === 'OK') {
          this.LoadClientParameterizationM = resC.object;
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });

    } else if (this.verSeleccion == 48) {
      this.LoadClientParameterizationS.directvCount().subscribe(resC => {
        if (resC.message === 'OK') {
          this.LoadClientParameterizationM = resC.object;
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    }

  }

  download() {
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
    downloadLink.setAttribute("download", "Carga IQ09.csv");
    downloadLink.style.visibility = "hidden";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  log(userId: number, status: string) {
    this.LoadClientParameterizationS.createLogIq(userId, status).subscribe(resL => {
      if (resL.message === 'OK') {
        if (resL.object != 0) {

        } else {
          this.alertS.open(resL.message, 'error');
        }
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    })

  }
}

