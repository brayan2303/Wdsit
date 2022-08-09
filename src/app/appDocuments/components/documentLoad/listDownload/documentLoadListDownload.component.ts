import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { DocumentLoadEntity } from "src/app/appDocuments/entities/DocumentLoadEntity";
import { documentFileModel } from "src/app/appDocuments/models/documentFile.model";
import { documentTypeModel } from "src/app/appDocuments/models/documentType.model";
import { DocumentLoadService } from "src/app/appDocuments/services/DocumentLoad.Service";
import { DocumentsTypeService } from "src/app/appDocuments/services/DocumentType.Service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { AlertService } from "src/app/shared/services/alert.service";
@Component({
    selector: 'app-documentLoadListDownload',
    templateUrl: './documentLoadListDownload.component.html',
    styleUrls: ['./documentLoadListDownload.component.css']
})
export class DocumentLoadListDownloadComponent implements OnInit {
    public loading: boolean;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatSort) sort: MatSort;
    dataSource = new MatTableDataSource<any>();
    columns: string[];
    documentPropertyIdentification: number;
    TypeList: documentTypeModel[];
    DocumentLoadE: DocumentLoadEntity;
    genPersonE: GenPersonEntity;
    documentId: number;
    documentFile: documentFileModel[];

    constructor(private alertS: AlertService, private documentLoadDS: DocumentLoadService, private documentLoadS: DocumentLoadService, private documentTypeS:DocumentsTypeService) {
        this.loading = false;
        this.columns = ['userPropertyIdentification', 'userPropertyName', 'documentName', 'version', 'active', 'actions'];
        this.dataSource = new MatTableDataSource([]);
        this.documentFile = [];
    }

    ngOnInit(): void {
        this.genPersonE = JSON.parse(localStorage.getItem('user'));
        this.documentPropertyIdentification = 0;
        this.genPersonE = new GenPersonEntity();
        this.DocumentLoadE = new DocumentLoadEntity();
        this.loading = true;
        this.TypeList = [];
        this.documentId = 0;
        this.search();
        this.listTypes();
    }

    listTypes(){
        this.documentTypeS.listByLevelAccess((JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res => {
            if (res.message === 'OK') {
                this.TypeList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    search() {
        this.loading = true;
        this.documentLoadDS.findByIdentification(this.documentPropertyIdentification, this.documentId).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataSource = new MatTableDataSource<any>(res.object);
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    searchDocument(item: DocumentLoadEntity) {
        this.documentLoadDS.searchDocs(item.id).subscribe(res => {
            if (res.message === 'OK') {
                this.documentLoadDS.registerDownload((JSON.parse(localStorage.getItem("user"))["id"]), item.id).subscribe(resA => {
                    if (resA.message === 'OK') {
                        if (resA.object != 0) {
                            this.alertS.open('¡ Archivo descargado !', 'success');
                        }

                    } else {
                        this.alertS.open(res.message, 'error')
                    }
                })
                this.download(res.object);
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });

    }

    download(file: documentFileModel) {
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
            var blob = new Blob([bytes], { type: "application/" + file.type });
            downloadLink.href = window.URL.createObjectURL(blob);
        }
        downloadLink.setAttribute("download", file.name + '.' + file.type);
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    listType() {
        this.documentLoadS.listType().subscribe(res => {
            if (res.message === 'OK') {
                this.TypeList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}