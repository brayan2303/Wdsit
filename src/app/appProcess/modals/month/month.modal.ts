import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProMonthService } from '../../services/proMonth.service';
import { ProMeasurementDetailService } from '../../services/ProMeasurementDetail.service';
import { ProFormulaVariableService } from '../../services/proFormulaVariable.service';
import { ProMeasurementDetailVariableEntity } from '../../entities/proMeasurementDetailVariable.entity';
import { ProMeasurementDetailVariableService } from '../../services/proMeasurementDetailVariable.service';

@Component({
    selector: 'modal-month',
    templateUrl: 'month.modal.html',
    styleUrls: ['./month.modal.css']
})
export class MonthModal {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private proMonthS: ProMonthService, private proMeasurementDetailS: ProMeasurementDetailService,private proFormulaVariableS:ProFormulaVariableService,private proMeasurementDetailVariableS:ProMeasurementDetailVariableService, private alertS: AlertService,
        public dialogRef: MatDialogRef<MonthModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.columns = ['id', 'name'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        this.proMonthS.list(this.data.measurementId).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(): void {
        this.dialogRef.close();
    }
    save(monthId: number) {
        this.proMeasurementDetailS.create(this.data.measurementId, monthId,this.data.goal).subscribe(resC => {
            if (resC.message === 'OK') {
                if (resC.object != 0) {
                    this.alertS.open('Mes agregado!', 'success');
                    this.proFormulaVariableS.listMeasurementId(this.data.measurementId).subscribe(resLM=>{
                        if(resLM.message==='OK'){
                            var variables=resLM.object;
                            var array:ProMeasurementDetailVariableEntity[]=[];
                            for(let v of variables){
                                var b=new ProMeasurementDetailVariableEntity();
                                b.measurementDetailId=resC.object;
                                b.variableId=v.id;
                                array.push(b);
                            }
                            if(array.length>0){
                                this.proMeasurementDetailVariableS.create(array).subscribe(resCV=>{
                                    if(resCV.message==='OK'){
                                        if(resCV.object===0){
                                            this.alertS.open('Error al crear las variables!','error');
                                        }
                                    }else{
                                        this.alertS.open(resCV.message,'error');
                                    }
                                },err=>{
                                    this.alertS.open(err.message,'error');
                                });
                            }
                        }else{
                            this.alertS.open(resLM.message,'error');
                        }
                    },err=>{
                        this.alertS.open(err.message,'error');
                    });
                    this.loading = true;
                    this.proMonthS.list(this.data.measurementId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.loading = false;
                            this.dataSource = new MatTableDataSource<any>(res.object);
                            this.dataSource.paginator = this.paginator;
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open('Error al agregar el mes!', 'error');
                }
            } else {
                this.alertS.open(resC.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}