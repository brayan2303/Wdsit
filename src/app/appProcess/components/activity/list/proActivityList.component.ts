import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ProPerspectiveEntity } from 'src/app/appProcess/entities/proPerspective.entity';
import { ProStrategicObjetiveEntity } from 'src/app/appProcess/entities/proStrategicObjetive.entity';
import { ProWorkPlanEntity } from 'src/app/appProcess/entities/proWorkPlan.entity';
import { ProAdvanceEntity } from 'src/app/appProcess/entities/proAdvance.entity';
import { ProAdvanceFileModel } from 'src/app/appProcess/models/proAdvanceFile.model';
import { ProActivityService } from 'src/app/appProcess/services/ProActivity.service';
import { ProPerspectiveService } from 'src/app/appProcess/services/proPerspective.service';
import { ProStrategicObjetiveService } from 'src/app/appProcess/services/proStrategicObjetive.service';
import { ProWorkPlanService } from 'src/app/appProcess/services/proWorkPlan.service';
import { ProAdvanceService } from 'src/app/appProcess/services/proAdvance.service';
import { ProAdvanceNewComponent } from 'src/app/appProcess/modals/advance/proAdvanceNew.component';

@Component({
    selector: 'app-proActivityList',
    templateUrl: './proActivityList.component.html',
    styleUrls: ['./proActivityList.component.css']
})
export class ProActivityListComponent implements OnInit {
    activityId: number;
    loading: boolean;
    loadingFile: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    genPersonEntity: GenPersonEntity;
    yearList: number[];
    perspectiveList: ProPerspectiveEntity[];
    strategicObjetiveList: ProStrategicObjetiveEntity[];
    workPlanList: ProWorkPlanEntity[];
    advanceList: ProAdvanceEntity[];
    fileList: ProAdvanceFileModel[];
    year: number;
    perspectiveId: number;
    strategicObjetiveId: number;
    workPlanId: number;

    constructor(private proActivityS: ProActivityService, private proPerspectiveS: ProPerspectiveService, private proStrategicObjetiveS: ProStrategicObjetiveService,
         private proWorkPlanS: ProWorkPlanService, private proAdvanceS: ProAdvanceService, private alertS: AlertService, private dialog: MatDialog) {

        this.activityId = 0;
        this.loading = false;
        this.loadingFile = false;
        this.columns = ['id', 'name', 'description', 'percentage', 'deliverables', 'deliverDate', 'workPlan', 'responsibleUser', 'creationUser', 'status', 'acciones'];
        this.dataSource = new MatTableDataSource([]);
        this.yearList = [];
        this.perspectiveList = [];
        this.strategicObjetiveList = [];
        this.advanceList = [];
        this.fileList = [];
        this.year = 0;
        this.perspectiveId = 0;
        this.strategicObjetiveId = 0;
        this.workPlanId = 0;
    }

    ngOnInit(): void {
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        for (let i = 2020; i < 2026; i++) {
            this.yearList.push(i);
        }
    }
    getPerspective() {
        this.proPerspectiveS.listActive(this.year, this.genPersonEntity.id, Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.perspectiveList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getStrategicObjetive() {
        this.proStrategicObjetiveS.listActive(this.perspectiveId).subscribe(res => {
            if (res.message === 'OK') {
                this.strategicObjetiveList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getWorkPlan() {
        this.proWorkPlanS.listActive(this.strategicObjetiveId).subscribe(res => {
            if (res.message === 'OK') {
                this.workPlanList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getActivity() {
        this.loading = true;
        this.proActivityS.list(this.workPlanId).subscribe(res => {
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
    addItem(activityId: number) {
        const dialogRef = this.dialog.open(ProAdvanceNewComponent, {
            data: { 'activityId': activityId, 'creationUserId': this.genPersonEntity.id }
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.alertS.open('Avance creado!', 'success');
                this.getItem(activityId);
            }
        });
    }
    getItem(activityId: number) {
        this.activityId = activityId;
        this.proAdvanceS.list(activityId).subscribe(res => {
            if (res.message === 'OK') {
                this.advanceList = res.object;
                this.listFile();
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    deleteItem(itemId: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar el avance?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.proAdvanceS.delete(itemId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Avance eliminado!', 'success');
                            this.proAdvanceS.deleteFileItem(this.activityId, itemId).subscribe(resDI => {
                                if (resDI.message != 'OK') {
                                    this.alertS.open(resDI.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                            this.getItem(this.activityId);
                        } else {
                            this.alertS.open('Error al eliminar el avance!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    attachFile(itemId: number, file: FileList) {
        if (file[0] != undefined) {
            this.proAdvanceS.loadFile(this.activityId, itemId, file[0]).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Archivo cargado!', 'success');
                        this.getItem(this.activityId);
                    } else {
                        this.alertS.open('Error al cargar el archivo!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    listFile() {
        this.loadingFile = true;
        this.proAdvanceS.listFile(this.activityId).subscribe(resL => {
            if (resL.message === 'OK') {
                this.fileList = resL.object;
                this.loadingFile = false;
            } else {
                this.alertS.open(resL.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    deleteFile(itemId: number, fileName: string) {
        this.proAdvanceS.deleteFile(this.activityId, itemId, fileName).subscribe(resD => {
            if (resD.message === 'OK') {
                if (resD.object != 0) {
                    this.alertS.open('Archivo eliminado!', 'success');
                    this.getItem(this.activityId);
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
    downloadFile(file: ProAdvanceFileModel) {
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
    close(activityId: number) {
        this.proActivityS.openClose(activityId,'Cerrado').subscribe(resO => {
            if (resO.message === 'OK') {
                if (resO.object != 0) {
                    this.alertS.open('Actividad cerrada!', 'success');
                    this.getActivity();
                    this.activityId = 0;
                    this.fileList = [];
                } else {
                    this.alertS.open('Error al cerrar la actividad!', 'error');
                }
            } else {
                this.alertS.open(resO.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}