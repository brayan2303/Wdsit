import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { LoadReportDownloadEntity } from "src/app/appLoadValidateReport/entities/loadReportDownloadEntity";
import { LoadReportEntity } from "src/app/appLoadValidateReport/entities/loadReportEntity";
import { loadReportModel } from "src/app/appLoadValidateReport/models/loadReport.model";
import { ReportValidateLoadNameArchiveModel } from "src/app/appLoadValidateReport/models/reportValidateLoadName.model";
import { validateReportModel } from "src/app/appLoadValidateReport/models/validateReport.model";
import { LoadReportValidateService } from "src/app/appLoadValidateReport/services/loadReport.service";
import { ValidateReportService } from "src/app/appLoadValidateReport/services/validateReport.service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
    selector: 'app-loadReport',
    templateUrl: './loadReport.component.html',
    styleUrls: ['./loadReport.component.css']
})
export class LoadReportComponent implements OnInit {
    loading: boolean;
    genPersonE: GenPersonEntity;
    filesList: File[];
    uploading: boolean;
    CountryList: validateReportModel[];
    userId: number;
    form: FormGroup;
    countryId: number;
    typeFile: string;
    loadReportModel: loadReportModel[];
    loadNumber: number;
    header: string[];
    a: boolean;
    b: boolean;
    c: boolean;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatPaginator) paginatorD: MatPaginator;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatSort) sortD: MatSort;
    dataSource = new MatTableDataSource<LoadReportEntity>();
    dataSourceD = new MatTableDataSource<LoadReportDownloadEntity>();
    columns: string[];
    columnss: string[];
    extension: string;
    nameA: ReportValidateLoadNameArchiveModel;
    numberArchive: number;
    abreviatureCount: string;
    dateFormat: string;
    nameArchives: string;
    typeName: string;
    validate: boolean;
    validateRep:boolean;
    value:number;

    constructor(private dialog: MatDialog, private alertS: AlertService, private valLoadReport: LoadReportValidateService, private validateR: ValidateReportService, private route: Router) {
        this.loading = false;
        this.userId = 0;
        this.CountryList = [];
        this.countryId = 0;
        this.typeFile = null;
        this.loadReportModel = [];
        this.filesList = [];
        this.loadNumber = 0;
        this.a = true;
        this.b = false;
        this.c = true;
        this.columns = ['Nombre Usuario', 'Nombre País', 'Fecha de carga', 'Descargar'];
        this.columnss = ['MODEL_CODE', 'MODEL_DESCRIPTION', 'DX_TYPE', 'SERIAL_EQUIPO', 'ADDRESS', 'REGION', 'CITY', 'DEPARTMENT'];
        this.header = ['modelCode', 'modelDescription', 'dxType', 'serialEquipo', 'address', 'region', 'city', 'department'];
        this.dataSource = new MatTableDataSource([]);
        this.dataSourceD = new MatTableDataSource([]);
        this.extension = '';
        this.nameA = new ReportValidateLoadNameArchiveModel();
        this.numberArchive = 0;
        this.abreviatureCount = "";
        this.dateFormat = "";
        this.nameArchives = "";
        this.typeName = "";
        this.validate = false;
        this.validateRep = false;
        this.value = 0;
    }

    ngOnInit(): void {
        this.countryId = 0;
        this.typeFile = null;
        this.loading = true;
        this.genPersonE = JSON.parse(localStorage.getItem('user'));
        this.listCountryUser();
    }
    listCountryUser() {
        this.validateR.ListCountry(this.genPersonE.id).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.FindCountry();
                    this.CountryList = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }

        });
    }

  
    addFile(file: FileList) {
        this.value = 10;
        if (this.countryId == 0 || this.typeFile == null) {
            this.alertS.open(' Debe elegir un País y un tipo de archivo !', 'error');
            this.countryId = 0;
            this.typeFile = "";
            this.filesList = [];
            window.location.reload();
            this.value = 20;
        } else {
            if (file != undefined) {
                for (let i = 0; i < file.length; i++) {
                    this.filesList.push(file[i]);
                    this.validateExtension();
                    this.value = 30;
                }
            }
        }

    }

    validateExtension() {
        this.value = 40;
        let idFile = (document.getElementById('idFile') as HTMLInputElement).value;
        this.extension = idFile.substring(idFile.lastIndexOf('.'), idFile.length);
        if (document.getElementById('idFile').getAttribute('accept').split(',').indexOf(this.extension) < 0) {
            this.alertS.open('¡ Archivo invalido !  No se permite archivos con tipo de extensión ' + this.extension, 'error');
            this.countryId = 0;
            this.typeFile = "";
            this.filesList = [];
        } else {
            this.alertS.open(' ¡ Se subió el archivo, Correctamente ! ', 'success');
            this.loadFile();
            this.value = 60;
        }
    }

    loadFile() {
        this.value = 70;
        this.valLoadReport.loadFile(this.countryId, this.genPersonE.id, this.typeFile, this.filesList).subscribe(resA => {
            if (resA.message === 'OK') {
                this.value = 90;
                if (resA.object != 0) {
                    this.filesList = [];
                    this.a = false;
                    this.b = true;
                    this.FindCountry()
                    this.value = 100;
                    this.validate = true;
           
                } else {
                    this.alertS.open(' ¡ Error al cargar el archivo !', 'error');
                    this.validate = false;
                    this.value = 0;
                }
            } else {
                this.alertS.open(resA.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    FindCountry() {
        this.loading = false;
        this.valLoadReport.ReportValidateFindCountry(this.countryId).subscribe(resC => {
            if (resC.message === 'OK') {
                if (resC.object != 0) {
                    this.loading = true;
                    this.dataSource = new MatTableDataSource(resC.object);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
            } else {
                this.alertS.open(resC.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });

    }

    validateArchive() {
        this.value =0;
        this.value =10;
        this.alertS.open('¡ Validando archivo ... !', 'success');
        this.value =20;
        this.b = true;
        this.a = false;
        this.value =30;
        this.valLoadReport.listFile(this.genPersonE.id, this.countryId, this.typeFile).subscribe(resA => {
            this.value =40;
            this.value =50;
            this.value =60;
            if (resA.message === 'OK') {
                this.value =70;
                this.value =80;
                if (resA.object != 0) {
                    this.value =90;
                    this.loadReportModel = resA.object;
                    this.countryId = 0;
                    this.typeFile = "";
                    this.a = true
                    this.c = false;
                    this.validateRep = true;
                    this.value =100;
                    this.alertS.open('Archivo validado con exito ', 'success')
                    this.value =100;
                }
            } else if (resA.message == "Error") {
                this.alertS.open(resA.object, 'warning');
                this.countryId = 0;
                this.typeFile = "";
                this.b = false;
                this.a = true;
                this.validateRep = false;
                this.value =0;
            }

            else {
                this.alertS.open(resA.message, 'error');
            }
        });
    }
    captura() {
        this.typeFile = this.typeName
    }

   
    
    deleteArchive() {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el archivo cargado ? ' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.valLoadReport.ReportValidateLoadDelete(this.genPersonE.id).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.FindCountry();
                            this.a = true;
                            this.c = true;
                            this.countryId = 0;
                            this.typeFile = "";
                            this.filesList = [];
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
        });
    }


    uploadFile() {
        this.value = 0;
        this.value = 10;
        this.value = 20;
        this.valLoadReport.ReportValidateLoadArchive(this.genPersonE.id).subscribe(resC => {
            this.value = 30;
            this.value = 50;
            if (resC.message === 'OK') {
                this.value = 70;
                this.value = 80;
                if (resC.object != 0) {
                    this.alertS.open(' ¡ Archivo generado e importado con Exito !', 'success');
                    this.value = 90;
                    this.a = true;
                    this.c = true;
                    this.countryId = 0;
                    this.typeFile = "";
                    this.filesList = [];
                    this.value = 100;
                } else {
                    this.alertS.open(resC.message, 'error');
                    this.value = 50;
                    this.value = 20;
                    this.value = 10;
                    this.value = 0;
                }
            } else {
                this.alertS.open(resC.message, 'error');
                this.value = 50;
                this.value = 20;
                this.value = 10;
                this.value = 0;
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    download(item: LoadReportEntity) {
        this.nameArchive();
        this.loading = true;
        this.valLoadReport.ReportValidateLoadDownload(this.genPersonE.id, item.codeLoad).subscribe(resV => {
            if (resV.message === 'OK') {
                if (resV.object != 0) {

                    this.loading = false;
                    this.dataSourceD = new MatTableDataSource(resV.object);
                    this.dataSourceD.paginator = this.paginatorD;
                    this.dataSourceD.sort = this.sortD;
                    this.loading = false;
                    let delimiter = "\\";
                    let headers = '';
                    let file = '';

                    for (let i = 0; i < this.columnss.length; i++) {
                        headers = headers + this.columnss[i];
                        if (i < this.columnss.length - 1) {
                            headers = headers + delimiter;
                        }
                    }
                    file = headers;
                    for (let i = 0; i < this.dataSourceD.data.length; i++) {
                        file = file + "\n";
                        for (let j = 0; j < this.header.length; j++) {
                            file = file + this.dataSourceD.data[i][this.header[j]];
                            file = file + delimiter;
                        }
                    }
                    let blob = new Blob(['\ufeff' + file], { type: 'text/csv;charset=utf-8;' });
                    let url = URL.createObjectURL(blob);
                    let downloadLink = document.createElement("a");
                    downloadLink.setAttribute("href", url);
                    downloadLink.setAttribute("download", this.numberArchive + "_" + this.abreviatureCount + "_" + this.dateFormat + "_" + "WODEN" + "_" + this.nameArchives + ".csv");
                    downloadLink.style.visibility = "hidden";
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    this.countryId = 0;
                    this.typeFile = "";

                }
            } else {
                this.alertS.open(resV.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    nameArchive() {
        this.valLoadReport.ReportValidateNameArchive(this.genPersonE.id).subscribe(resF => {
            if (resF.message === 'OK') {
                if (resF.object != 0) {
                    this.nameA = resF.object;
                    this.numberArchive = this.nameA.numberCountry;
                    this.abreviatureCount = this.nameA.abreviatureCountry;
                    this.dateFormat = this.nameA.dateCreation;
                    this.nameArchives = this.nameA.nameArchive;
                }
            }
        });
    }

    downloadSap() {

    }
}