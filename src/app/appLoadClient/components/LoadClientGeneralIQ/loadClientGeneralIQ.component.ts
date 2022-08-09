import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MatPaginator } from "@angular/material/paginator";
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { LoadClientRuleGeneralService } from '../../services/loadClientGeneralIQ.service';
import { LoadPersonCustomerService } from "../../services/loadPersonCustomer.service";
import { LoadClientParameterizationService } from "../../services/LoadClientParameterization.service";

@Component({
  selector: 'app-loadClientGeneralIQ',
  templateUrl: './loadClientGeneralIQ.component.html',
  styleUrls: ['./loadClientGeneralIQ.component.css']
})

export class LoadClientGeneralIQComponent implements OnInit {
  uploading: boolean;
  loading: boolean;
  columns: string[];
  fileList: File[];
  header: string[];
  dataSource: MatTableDataSource<any>;
  public listCustomers: GenCustomerEntity[];
  @ViewChild('paginator') paginator: MatPaginator;
  person: GenPersonEntity;
  loadId: number;
  countryId: number;
  customer: GenCustomerEntity;
  customerList: GenCustomerEntity[];
  countryList: GenCountryEntity[];
  @Inject(MAT_DIALOG_DATA) public data: any
  verSeleccion: number = 0;
  opcionSeleccionado: number;
  customerName: string;

  constructor(private LoadClientParameterizationS: LoadClientParameterizationService, private LoadClientRuleGeneralS: LoadClientRuleGeneralService, private alertS: AlertService, private loadCustomerPersoS: LoadPersonCustomerService) {
    this.loading = false;
    this.columns = ['CLIENTE', 'SERIAL EQUIPO', 'CODIGO SAP', 'ESTADO', 'TIPOLOGIA'];
    this.header = ['customer', 'serial', 'codSap', 'status', 'typology'];
    this.dataSource = new MatTableDataSource([]);
    this.loadId = 0;
    this.uploading = false;
    this.fileList = [];
    this.customer = new GenCustomerEntity();
    this.countryId = 0;
    this.person = new GenPersonEntity();
    this.opcionSeleccionado = 0;
    this.customerName = '';
  }
  ngOnInit(): void {
    this.person = JSON.parse(localStorage.getItem('user'));
    this.customerSelect();
  }

  customerSelect() {
    this.person = JSON.parse(localStorage.getItem('user'));
    this.loadCustomerPersoS.findCustomerByPersonIdList(this.person.id).subscribe(res => {
      if (res.message === 'OK') {
        this.customerList = res.object;

      } else { this.alertS.open(res.message, 'error'); }
    }, err => {
      this.alertS.open(err.message, 'error');
    })

  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;

  }

  getData() { //HUGHES
    this.capturar();
    if (this.verSeleccion == 29) {
      this.customerName = 'HUGHES';
      this.loading = true;
      this.LoadClientRuleGeneralS.delete(this.customerName).subscribe(resD => {
        if (resD.message === 'OK') {
            this.LoadClientRuleGeneralS.createHughes().subscribe(resL => {
              if (resL.message === 'OK') {
                this.dataSource = new MatTableDataSource(resL.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
                this.log(this.person.id);
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });

        } else {
          this.alertS.open(resD.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      })
    } else if (this.verSeleccion == 61) { //PLATAFORMA MOVIL
      this.customerName = 'PLATAFORMA MOVIL'
      this.loading = true;
      this.LoadClientRuleGeneralS.delete(this.customerName).subscribe(resD => {
        if (resD.message === 'OK') {
            this.LoadClientRuleGeneralS.listPlataformaMovil().subscribe(resL => {
              if (resL.message === 'OK') {
                this.dataSource = new MatTableDataSource(resL.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
                this.log(this.person.id);
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
        } else {
          this.alertS.open(resD.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      })
    } else if (this.verSeleccion == 60) { //RED EXTERNA
      this.customerName = 'RED EXTERNA'
      this.loading = true;
      this.LoadClientRuleGeneralS.delete(this.customerName).subscribe(resD => {
        if (resD.message === 'OK') {
            this.LoadClientRuleGeneralS.listRedExterna().subscribe(resL => {
              if (resL.message === 'OK') {
                this.dataSource = new MatTableDataSource(resL.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
                this.log(this.person.id);
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
        } else {
          this.alertS.open(resD.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      })
    } else if (this.verSeleccion == 5) { //ETB
      this.customerName = 'ETB';
      this.loading = true;
      this.LoadClientRuleGeneralS.delete(this.customerName).subscribe(resD => {
        if (resD.message === 'OK') {

            this.LoadClientRuleGeneralS.createEtb().subscribe(resL => {
              if (resL.message === 'OK') {
                this.dataSource = new MatTableDataSource(resL.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
                this.log(this.person.id);
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
        } else {
          this.alertS.open(resD.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      })
    } else if (this.verSeleccion == 2) { //CLARO
      this.customerName = 'CLARO';
      this.loading = true;
      this.LoadClientRuleGeneralS.delete(this.customerName).subscribe(resD => {
        if (resD.message === 'OK') {

            this.LoadClientRuleGeneralS.createClaro().subscribe(resL => {
              if (resL.message === 'OK') {
                this.dataSource = new MatTableDataSource(resL.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
                this.log(this.person.id);
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
        } else {
          this.alertS.open(resD.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      })

    } else if (this.verSeleccion == 48) { //DIRECTV
      this.customerName = 'DIRECTV';
      this.loading = true;
      this.LoadClientRuleGeneralS.delete(this.customerName).subscribe(resD => {
        if (resD.message === 'OK') {
            this.LoadClientRuleGeneralS.createDirectv().subscribe(resL => {
              if (resL.message === 'OK') {
                this.dataSource = new MatTableDataSource(resL.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
                this.log(this.person.id);

              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
        } else {
          this.alertS.open(resD.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      })
    } else if (this.verSeleccion == 15) { //TIGO

      this.customerName = 'TIGO';
      this.loading = true;
      this.LoadClientRuleGeneralS.delete(this.customerName).subscribe(resD => {
        if (resD.message === 'OK') {
            this.LoadClientRuleGeneralS.createTigo().subscribe(resL => {
              if (resL.message === 'OK') {
                this.dataSource = new MatTableDataSource(resL.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource = this.dataSource
                this.loading = false;
                this.log(this.person.id);
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
        } else {
          this.alertS.open(resD.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      })

    } else {
      this.alertS.open('El cliente no se encuentra con carga automatica', 'warning');
    }
  }

  download() {
    let delimiter = "\t";
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
      for (let j = 0; j < this.header.length; j++) {
        file = file + this.dataSource.data[i][this.header[j]];
        file = file + delimiter;
      }
    }
    let blob = new Blob(['\ufeff' + file], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", url);
    downloadLink.setAttribute("download", "Listado.csv");
    downloadLink.style.visibility = "hidden";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  log(userId: number) {
    this.LoadClientParameterizationS.createLogDoc(userId).subscribe(resL => {
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

