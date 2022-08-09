import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { PqrPersonLanguageModal } from "../../modals/pqrPersonLanguage/pqrPersonLanguage.modal";
import { PqrPersonMasterModal } from "../../modals/pqrPersonMaster/pqrPersonMaster.modal";
import { PqrTicketPersonModal } from "../../modals/pqrTicketPerson/pqrTicketPerson.modal";

@Component({
    selector: 'app-personAsigList',
    templateUrl: './personAsigList.component.html',
    styleUrls: ['./personAsigList.component.css']
})
export class PersonAsigListComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private genPersonS: GenPersonService, private alertS: AlertService, private dialog: MatDialog) {
        this.loading = false;
        this.columns = ['identification', 'firstName', 'lastName', 'userName','mail', 'creationDate', 'centerCost', 'position', 'city', 'active', 'actions'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        this.genPersonS.list().subscribe(res => {
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
    
    getLanguage(id:number){
        this.dialog.open(PqrPersonLanguageModal, {
            data: { 'userId': id },
            width: '600px'
        });
    }
    
    getTypePqrs(id:number){
        this.dialog.open(PqrPersonMasterModal, {
            data: { 'userId': id },
            width: '600px'
        });
    }
    getTicket(id:number){
        this.dialog.open(PqrTicketPersonModal, {
            data: { 'userId': id },
            width: '600px'
        });
    }
  
}