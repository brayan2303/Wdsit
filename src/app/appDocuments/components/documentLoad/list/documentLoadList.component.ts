import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { DocumentLoadGroupModal } from "src/app/appDocuments/modals/documentLoadGroup.modal";
import { GenPersonService } from "src/app/appGeneral/services/genPerson.service";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
    selector: 'app-documentLoadList',
    templateUrl: './documentLoadList.component.html',
    styleUrls: ['./documentLoadList.component.css']
})
export class DocumentLoadListComponent implements OnInit{
    loading: boolean;
    columns: string[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatSort) sort: MatSort;
    dataSource = new MatTableDataSource<any>();

    constructor(private genPersonS: GenPersonService, private dialog: MatDialog, private alertS: AlertService){
        this.loading = false;
        this.columns = ['identification', 'firstName','lastName', 'userName','active','actions'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true; 
        this.genPersonS.list().subscribe(res =>{
            if(res.message === 'OK'){
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } else{
                this.alertS.open(res.message, 'error');
            }
        }, err =>{
            this.alertS.open(err.message, 'error');
        });
    }
    filter(event: Event){
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if(this.dataSource.paginator){
            this.dataSource.paginator.firstPage();
        }
    }

    getGroup(id:number){
        this.dialog.open(DocumentLoadGroupModal, {
            data: { 'id': id },
            width: '600px'
        });
    }

}