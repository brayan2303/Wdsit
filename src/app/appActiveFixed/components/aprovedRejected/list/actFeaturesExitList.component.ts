import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActiveFixedAssigmentService } from "src/app/appActiveFixed/services/activeFixedAssigment.service";
import { ActiveFixedAssigSerialService } from "src/app/appActiveFixed/services/activeFixedAssigSerial.service";
import { ActAnswerModal } from "src/app/appActiveFixed/modals/answer/actProdAnswer.modal";
import { ActiveFixedAssigmentEntity } from "src/app/appActiveFixed/entities/activeFixedAssigment.entity";
import { DateModal } from "src/app/appActiveFixed/modals/dates/dates.modal";



@Component({
    selector: 'app-actFeaturesExitList',
    templateUrl: './actFeaturesExitList.component.html',
    styleUrls: ['./actFeaturesExitList.component.css']
})

export class ActAssigExitListComponent implements OnInit {

    loading: boolean;
    columns: string[];
    id: number;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Inject(MAT_DIALOG_DATA) public data: any
    @ViewChild(MatSort) sort: MatSort;
    unibytes: Uint8Array = null;
    activeFixedAssigmentEntity : ActiveFixedAssigmentEntity;
    form: any;
    date: boolean;
    constructor(private activeFixedAsigmentS: ActiveFixedAssigmentService, private dialog: MatDialog, private alertS: AlertService, private activeFixedSerialesS:ActiveFixedAssigSerialService) {
        this.loading = false;
        this.columns = ['identification', 'name', 'product', 'serial', 'nameRes','answer','approvedRejected', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
            this.listAnswer();
    }

    listAnswer() {
        this.activeFixedAsigmentS.listAnswer((JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res => {
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
   

    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

   save(id: number,identification:number, status: boolean, answer: string){
     if(answer!=null){
           this.aprovedRejected(identification, status);
     }else{
          this.answer(id,identification, status);
     }
   }
   aprovedRejected(id: number, status: boolean) {
       this.activeFixedAsigmentS.aprovedRejected(id, status).subscribe(res => {
          if (res.message === 'OK') {
              if (res.object != 0) {
                this.alertS.open(status === true ? 'Aprobado!' : 'Rechazado!', 'success');
                   this.loading = true,
                       this.activeFixedAsigmentS.listAnswer((JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res => {
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
            } else {
                   this.alertS.open(status === true ? 'Error al activar!' : 'Error al inactivar!', 'error');
               }
          } else {
              this.alertS.open(res.message, 'error');
          }
       }, err => {
           this.alertS.open(err.message, 'error');
      });
   }

    answer(id: number, identification:number, status: boolean) {
       this.dialog.open(ActAnswerModal, {
           width: '100%',
            data: {id:id}
        }).afterClosed().subscribe(res=>{
          if(res){
             this.aprovedRejected(identification,status);
           }
       })
    }

    dates(id: number) {
        this.dialog.open(DateModal, {
            width: '100%',
             data: {id:id}
         }).afterClosed().subscribe(res=>{
        })
     }

}

    


