import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { BscActivityService } from 'src/app/appBalanceScoreCard/services/bscActivity.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { BscPerspectiveService } from 'src/app/appBalanceScoreCard/services/bscPerspective.service';
import { BscStrategicObjetiveService } from 'src/app/appBalanceScoreCard/services/bscStrategicObjetive.service';
import { BscPerspectiveEntity } from 'src/app/appBalanceScoreCard/entities/bscPerspective.entity';
import { BscStrategicObjetiveEntity } from 'src/app/appBalanceScoreCard/entities/bscStrategicObjetive.entity';
import { BscWorkPlanEntity } from 'src/app/appBalanceScoreCard/entities/bscWorkPlan.entity';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { BscAdvanceService } from 'src/app/appBalanceScoreCard/services/bscAdvance.service';
import { BscAdvanceEntity } from 'src/app/appBalanceScoreCard/entities/bscAdvance.entity';
import { BscAdvanceFileModel } from 'src/app/appBalanceScoreCard/models/bscAdvanceFile.model';
import { BscWorkPlanService } from 'src/app/appBalanceScoreCard/services/bscWorkPlan.service';
import { BscAdvanceNewComponent } from 'src/app/appBalanceScoreCard/modals/advance/bscAdvanceNew.component';

@Component({
    selector: 'app-bscActivityList',
    templateUrl: './bscActivityList.component.html',
    styleUrls: ['./bscActivityList.component.css']
})
export class BscActivityListComponent implements OnInit {
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
    perspectiveList: BscPerspectiveEntity[];
    strategicObjetiveList: BscStrategicObjetiveEntity[];
    workPlanList: BscWorkPlanEntity[];
    advanceList: BscAdvanceEntity[];
    fileList: BscAdvanceFileModel[];
    year: number;
    perspectiveId: number;
    strategicObjetiveId: number;
    workPlanId: number;

    constructor(private bscActivityS: BscActivityService, private bscPerspectiveS: BscPerspectiveService, private bscStrategicObjetiveS: BscStrategicObjetiveService, private bscWorkPlanS: BscWorkPlanService, private bscAdvanceS: BscAdvanceService, private alertS: AlertService, private dialog: MatDialog) {
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
        this.bscPerspectiveS.listActive(this.year, this.genPersonEntity.id, Number(localStorage.getItem('countryId'))).subscribe(res => {
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
        this.bscStrategicObjetiveS.listActive(this.perspectiveId).subscribe(res => {
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
        this.bscWorkPlanS.listActive(this.strategicObjetiveId).subscribe(res => {
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
        this.bscActivityS.list(this.workPlanId).subscribe(res => {
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
        const dialogRef = this.dialog.open(BscAdvanceNewComponent, {
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
        this.bscAdvanceS.list(activityId).subscribe(res => {
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
                this.bscAdvanceS.delete(itemId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Avance eliminado!', 'success');
                            this.bscAdvanceS.deleteFileItem(this.activityId, itemId).subscribe(resDI => {
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
            this.bscAdvanceS.loadFile(this.activityId, itemId, file[0]).subscribe(res => {
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
        this.bscAdvanceS.listFile(this.activityId).subscribe(resL => {
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
        this.bscAdvanceS.deleteFile(this.activityId, itemId, fileName).subscribe(resD => {
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
    downloadFile(file: BscAdvanceFileModel) {
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
        this.bscActivityS.openClose(activityId,'Cerrado').subscribe(resO => {
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