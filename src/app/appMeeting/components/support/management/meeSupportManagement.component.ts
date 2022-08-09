import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MeeSupportService } from "src/app/appMeeting/services/meeSupport.service";
import * as moment from 'moment';
import { AlertService } from "src/app/shared/services/alert.service";
import { MatDialog } from "@angular/material/dialog";
import { SupportNewModal } from "src/app/appMeeting/modals/supportNew/supportNew.modal";
import { MeeSupportEntity } from "src/app/appMeeting/entities/meeSupport.entity";
import { MeeSupportFileModel } from "src/app/appMeeting/models/meeSupportFile.model";

@Component({
    selector: 'app-meeSupportManagement',
    templateUrl: './meeSupportManagement.component.html',
    styleUrls: ['./meeSupportManagement.component.css']
})
export class MeeSupportManagementComponent {
    loading: boolean;
    loadingFiles: boolean;
    columns: string[];
    dataSource: MatTableDataSource<any>;
    @ViewChild('paginator') paginator: MatPaginator;
    date1: string;
    date2: string;
    states: string;

    supportId: number;
    meetingId: number;
    fileList: MeeSupportFileModel[];
    listStatus: MeeSupportEntity;

    constructor(private meeSupportS: MeeSupportService, private alertS: AlertService, private dialog: MatDialog) {
        this.loading = false;
        this.loadingFiles = false;
        this.columns = ['meeting', 'support', 'status', 'startDate', 'endDate', 'creationUser', 'actions'];
        this.dataSource = new MatTableDataSource([]);
        this.date1 = '';
        this.date2 = '';
        this.states = '';
        this.supportId = 0;
        this.meetingId = 0;
        this.fileList = [];
    }

    search() {
        this.meetingId = 0;
        this.supportId = 0;
        this.fileList = [];
        this.loading = true;

        if (this.states != '') {
            if (this.date1 != '' && (this.date2 == '' || this.date2 == null) ) {
                this.alertS.open('Error seleccione una fecha final', 'warning');
                return;
            } else if ((this.date1 == '' || this.date1 == null) && this.date2 != '') {
                this.alertS.open('Error seleccione una fecha inicio', 'warning');
                return;
            }
                    this.meeSupportS.listByUserId(Number(JSON.parse(localStorage.getItem('user'))['id']), this.date1 != '' && this.date1 != null ? moment(this.date1).format('YYYY-MM-DD') : '0', this.date2 != '' && this.date2 != null ? moment(this.date2).format('YYYY-MM-DD') : '0', this.states).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = new MatTableDataSource(res.object);
                            this.dataSource.paginator = this.paginator;
                            this.loading = false;
                        } else {
                            this.alertS.open(res.message, 'error');
                            this.loading = false;
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                        this.loading = false;
                    });
                
        } else {

            this.alertS.open('Error seleccione un estado', 'warning')
        }
    }

    status() {
        this.meeSupportS.listStatus(this.states).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = new MatTableDataSource(res.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
            } else {
                this.alertS.open(res.message, 'error');
                this.loading = false;
            }
        }), err => {
            this.alertS.open('Error en la consulta', 'error');
            this.loading = false
        }
    }


    management(support: MeeSupportEntity) {
        if (support.status === 'Pendiente') {
            this.dialog.open(SupportNewModal, {
                data: { support: support },
                width: '100%'
            }).afterClosed().subscribe(resA => {
                if (resA) {
                    this.search();
                }
            });
        } else {
            this.alertS.open('El apoyo ya esta ' + support.status, 'warning');
        }
    }
    getFiles(meetingId: number, supportId: number) {
        this.loadingFiles = true;
        this.meetingId = meetingId;
        this.supportId = supportId;
        this.meeSupportS.listFiles(meetingId, supportId).subscribe(res => {
            if (res.message === 'OK') {
                this.fileList = res.object;
                this.loadingFiles = false;
            } else {
                this.alertS.open(res.message, 'error');
                this.loadingFiles = false;
            }
        }, err => {
            this.alertS.open(err.message, 'error');
            this.loadingFiles = false;
        });
    }
    loadFile(file: FileList) {
        if (file[0] != undefined) {
            this.meeSupportS.loadFile(this.meetingId, this.supportId, file[0]).subscribe(resL => {
                if (resL.message === 'OK') {
                    if (resL.object != 0) {
                        this.alertS.open('Archivo cargado!', 'success');
                        this.getFiles(this.meetingId, this.supportId);
                    } else {
                        this.alertS.open(resL.message, 'error');
                    }
                } else {
                    this.alertS.open(resL.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    downloadFile(file: MeeSupportFileModel) {
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
    deleteFile(fileName: string) {
        this.meeSupportS.deleteFile(this.meetingId, this.supportId, fileName).subscribe(resD => {
            if (resD.message === 'OK') {
                if (resD.object != 0) {
                    this.alertS.open('Archivo eliminado!', 'success');
                    this.getFiles(this.meetingId, this.supportId);
                } else {
                    this.alertS.open('Error al eliminar el archivo!', 'error');
                }
            } else {
                this.alertS.open(resD.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}