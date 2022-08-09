import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { GenPersonCustomerService } from 'src/app/appGeneral/services/genPersonCustomer.service';
import { GenPersonCustomerEntity } from 'src/app/appGeneral/entities/genPersonCustomer.entity';
import { comCommodityLocationModel } from 'src/app/appComodityEntry/models/comCommodityLocationModel';
import { ComCommodityEntrySapB1Service } from 'src/app/appComodityEntry/services/ComCommodityEntrySapB1Service.service';
import { ComCommodityEntrySapB1Entity } from 'src/app/appComodityEntry/entities/ComCommodityEntrySapB1Entity';
import { ComEntryListModal } from 'src/app/appComodityEntry/modals/ComEntryList/comEntryList.modal';
import { ComCommodityEntryArticlesService } from 'src/app/appComodityEntry/services/ComCommodityEntryArticlesService.service';
import { ComCommodityEntryArticlesEntity } from 'src/app/appComodityEntry/entities/ComCommodityEntryArticlesEntity';
import { ComCommodityEntryService } from 'src/app/appComodityEntry/services/ComCommodityEntryService';
import { ComCommodySAPService } from 'src/app/appComodityEntry/services/ComCommodySAPService';
import { ComCommodityPalletModel } from 'src/app/appComodityEntry/models/comCommodityPalletModel';
import { ComCommodityEntryEntity } from 'src/app/appComodityEntry/entities/ComCommodityEntryEntity';


@Component({
  selector: 'app-ComCommodityEntrySapB1',
  templateUrl: './ComCommodityEntrySapB1.component.html',
  styleUrls: ['./ComCommodityEntrySapB1.component.css']
})
export class ComCommodityEntrySapB1Component implements OnInit{
  loading: boolean;
  loadingArticles: boolean;
  columns: string[];
  columnsLoading: string[];
  dataSource = new MatTableDataSource<any>();

  //Principal Table
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //Articles Table
  dataSourceLoading = new MatTableDataSource<any>();
  @ViewChild(MatTable) tableLoading: MatTable<any>;
  @ViewChild('paginatorLoading') paginatorLoading: MatPaginator;
  @ViewChild(MatSort) sortLoading: MatSort;

  customerList:GenPersonCustomerEntity[];
  locationList:comCommodityLocationModel[];
  customerId:number;
  location:string;
  entrySapB1Id:number;
  entryData:ComCommodityEntrySapB1Entity;
  validateQuantity:boolean;
  validateEntry:boolean;
  searchArticles:ComCommodityEntryArticlesEntity[];
  searchSap:boolean;
  validateCharge:boolean;
  valueCharge:number;
  codeEntry:string;
  ComCommodityEntryE:ComCommodityEntryEntity;
  countryId:string; 
  
  constructor(private alertS: AlertService, private ComEntryS:ComCommodityEntryService, private sapBO:ComCommodySAPService, private GenCustomer:GenPersonCustomerService, private ComCommodityEntrySapB1S:ComCommodityEntrySapB1Service, private ComCommotityArticlesS:ComCommodityEntryArticlesService, private dialog: MatDialog) {

    this.loading = false;
    this.columns = ['number','customerName', 'origin','originType','actions'];
    this.dataSource = new MatTableDataSource([]);

    this.loadingArticles = false;
    this.columnsLoading = ['sapCode', 'sapCodeDescription','quantity'];
    this.dataSourceLoading = new MatTableDataSource([]);
    this.customerList = [];
    this.locationList = [];
    this.customerId = 0;
    this.entrySapB1Id = 0;
    this.location = "";
    this.entryData = new ComCommodityEntrySapB1Entity();
    this.validateQuantity = false;
    this.validateEntry = false;
    this.searchArticles = [];
    this.searchSap = true;
    this.validateCharge = true;
    this.valueCharge = 0;
    this.codeEntry = '';
    this.countryId = '';
    this.ComCommodityEntryE = new ComCommodityEntryEntity();
  }

  
  ngOnInit(): void {
    this.countryId =localStorage.getItem('countryId');
    this.getCustomerList();
  }

  getCustomerList(){
    this.GenCustomer.listCustomer((JSON.parse(localStorage.getItem("user"))["id"]),JSON.parse(localStorage.getItem("countryId"))).subscribe(res => {
      if (res.message === 'OK') {
          this.customerList = res.object;
      } else {
          this.alertS.open(res.message, 'error');
      }
    }, err => {
        this.alertS.open(err.message, 'error');
    });
  }

  getLocationList(){
    this.ComCommodityEntrySapB1S.locationList(Number(this.countryId) ,this.customerId).subscribe(res => {
      if (res.message === 'OK') {
          this.locationList = res.object;
      } else {
          this.alertS.open(res.message, 'error');
      }
    }, err => {
        this.alertS.open(err.message, 'error');
    });
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }

  filterLoading(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLoading.filter = filterValue.trim();

    if (this.dataSourceLoading.paginator) {
        this.dataSourceLoading.paginator.firstPage();
    }
  }

  loadArticles(){
    this.dataSourceLoading  = new MatTableDataSource([]);
    if(this.dataSource.data.length != 0){
      const data = this.dataSource.data;
      const dataLoading = this.dataSourceLoading.data;
      for(var i=0; i < data.length; i++){//Recorrer lista de ENTRADAS
        let articles = [];
        this.ComCommotityArticlesS.listByEntryNumber(data[i].number).subscribe(res => {//Busqueda de articulos
          if (res.message === 'OK') {
            articles = res.object;
            this.validateEntry = true;
            if(dataLoading.length != 0){ //Articulos encontrados
              for(var j = 0; j < articles.length; j++) //Recorrer la lista encontrada
              {
                //Validar ingreso si toca sumar o se pasa a la lista
                let validacion = true;
                dataLoading.some(x => {
                  if(x.sapCode === articles[j].sapCode){
                    x.quantity = x.quantity + articles[j].quantity;
                    validacion = false;
                  }
                });
                  if(validacion)
                  {
                    dataLoading.push(articles[j]);
                    this.dataSourceLoading = new MatTableDataSource<any>(dataLoading);
                    this.dataSourceLoading.paginator = this.paginatorLoading;
                    this.dataSourceLoading.sort = this.sortLoading;
                  }
              }
            } else {
              if(articles.length != 0){
                for(var j = 0; j < articles.length; j++)
                {
                  dataLoading.push(articles[j]);
                }
                this.dataSourceLoading = new MatTableDataSource<any>(dataLoading);
                this.dataSourceLoading.paginator = this.paginatorLoading;
                this.dataSourceLoading.sort = this.sortLoading;
              }
            }
          }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
      }

    } else {
      this.alertS.open('Por favor ingrese minimo una entrada', 'warning');
    }
  }

  loadEntrys(){
    if(this.customerId != 0){
      this.dialog.open(ComEntryListModal, {
        data: {
            customerId:this.customerId
        },
        width: '100%'
      }).afterClosed().subscribe(resA => {
        if(resA != null){
          this.validateQuantity = true;
          const data = this.dataSource.data;
          if(data.length != 0){
            if (!data.some(x => x.number === resA.object.number)) {
              if (data.some(x => x.customerName === resA.object.customerName)) {
                data.push(resA.object);
                this.dataSource = new MatTableDataSource<any>(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.validateEntry = false;
                this.dataSourceLoading = new MatTableDataSource([]);
              } else {
                this.alertS.open('El cliente no es el mismo', 'warning');
              }
            } else {
              this.alertS.open('El ingreso seleccionado ya esta en la lista', 'warning');
            }
          } else {
            data.push(resA.object);
            this.dataSource = new MatTableDataSource<any>(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      });
    } else {
      this.alertS.open('Por favor seleccione un cliente', 'warning');
    }
  }

  deleteEntry(row: number){
    const data = this.dataSource.data;
    data.splice(row, 1);
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.validateEntry = false;
    this.dataSourceLoading = new MatTableDataSource([]);
  }

  loadToSap(){
    const data = this.dataSource.data;
    var entrySap = new ComCommodityEntrySapB1Entity();
    entrySap.customerName = data[0].customerName;
    entrySap.location = this.location;
    entrySap.userId = (JSON.parse(localStorage.getItem("user"))["id"]);
    this.validateCharge = false;
    this.valueCharge = 10;
    this.ComCommodityEntrySapB1S.create(entrySap).subscribe(res => {
      if (res.message === 'OK') {
          let sapId = res.object;
          var envio = {
            "entrySapB1Id" : res.object,
            "entrys":this.dataSource.data
          };
          this.valueCharge = 30;
          this.ComCommodityEntrySapB1S.addEntry(envio).subscribe(res => {
            if (res.message === 'OK') {
              this.alertS.open('Creación de entrada con exito!', 'success');
              var sendToSAPBO = {
                "pallet" : sapId,
                "array" : this.dataSourceLoading.data
              };
              this.valueCharge = 60;
              this.sapBO.create(sendToSAPBO).subscribe(res => {
                if (res.message === 'OK') {
                  var updateEntry = {
                    'id': sapId,
                    'statusCode' : res.statusCode,
                    'documentCode' : res.object
                  }
                  this.ComCommodityEntrySapB1S.update(updateEntry).subscribe(res => {
                    if (res.message === 'OK') {
                      if(res.object != 0)
                      {
                        this.valueCharge = 100;
                        this.searchEntryById(sapId);
                        this.ComEntryS.findByPallet(sapId).subscribe(resF =>{
                          console.log(sapId);
                          if(resF.message === 'OK'){
                            this.ComCommodityEntryE = resF.object;
                            console.log(resF.object);
                            console.log(this.ComCommodityEntryE.number);
                            this.getDocument(this.ComCommodityEntryE.number);
                          }else{
                            this.alertS.open(resF.message, 'error');
                          }

                        },err=>{
                          this.alertS.open(err.message, 'error');
                        })
                      }
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

  searchEntryById(id:number){
    this.validateCharge = true;
    this.dataSource = new MatTableDataSource([]);
    this.dataSourceLoading = new MatTableDataSource([]);
    this.entryData = new ComCommodityEntrySapB1Entity();
    this.ComCommodityEntrySapB1S.findEntryId(id).subscribe(res => {
      if (res.message === 'OK') {
        this.searchSap = false;
        this.entryData = res.object;
        this.ComEntryS.sapList(id).subscribe(res => {
          if (res.message === 'OK') {
              this.loading = false;
              this.dataSource = new MatTableDataSource<any>(res.object);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.loadArticles();
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

  newEntry(){
    this.validateCharge = true;
    this.dataSourceLoading = new MatTableDataSource([]);
    this.customerList = [];
    this.locationList = [];
    this.customerId = 0;
    this.entrySapB1Id = 0;
    this.location = "";
    this.entryData = new ComCommodityEntrySapB1Entity();
    this.validateQuantity = false;
    this.validateEntry = false;
    this.searchArticles = [];
    this.searchSap = true;
    this.validateCharge = true;
    this.valueCharge = 0;
  }


  getDocument(entrySapB1:string){
    //Busqueda del certificado
  this.ComEntryS.getPallet(entrySapB1).subscribe(res => {
    if (res.message === 'OK') {
      //Descarga de lo obtenido.
      this.downloadFile(res.object);
    } else {
        this.alertS.open(res.message, 'error');
    }
  }, err => {
      this.alertS.open(err.message, 'error');
  });
}

  //Descargar el documento obtenido
  downloadFile(file: ComCommodityPalletModel) {
  var downloadLink = document.createElement("a");
  if (file.type === 'imagen') {
      downloadLink.setAttribute("href", "data:image/png;base64," + file.file);
  } else {
      var binary = window.atob(file.file);
      var binaryLength = binary.length;
      var bytes = new Uint8Array(binaryLength);
      for (var i = 0; i < binaryLength; i++) {
          var ascii = binary.charCodeAt(i);
          bytes[i] = ascii;
      }
      var blob = new Blob([bytes], { type: "application/" + file.type});
      downloadLink.href = window.URL.createObjectURL(blob);
  }
  downloadLink.setAttribute("download", file.name+'.'+file.type);
  downloadLink.style.visibility = "hidden";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  }

}



