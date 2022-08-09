import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTable, MatTableDataSource } from "@angular/material/table";

import { MatPaginator } from "@angular/material/paginator";

import { MatSort } from "@angular/material/sort";
import { ExportType, MatTableExporterDirective } from "mat-table-exporter";
import { AlertService } from "src/app/shared/services/alert.service";
import { DryIceService } from "../../services/DryIceService";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-dryIceFinish',
  templateUrl: './dryIceFinish.component.html',
  styleUrls: ['./dryIceFinish.component.css']
})

export class DryIceFinishComponent implements OnInit {
  uploading: boolean;
  loading: boolean;
  columns: string[];
  header: string[];
  @ViewChild('serials') searchElement: ElementRef;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatTableExporterDirective, { static: true }) exporter: MatTableExporterDirective;
  @ViewChild('paginator') paginator: MatPaginator;
  @Inject(MAT_DIALOG_DATA) public data: any
  @ViewChild(MatSort) sort: MatSort;
  fileType: string;
  genPersonEntity: GenPersonEntity;
  form: FormGroup;

  constructor(private alertS: AlertService, private dialog: MatDialog, private dryIceS: DryIceService, private fb: FormBuilder) {
    this.loading = false;
    this.columns = ['id', 'serial', 'creationDate',  'description', 'codSap', 'model', 'creationDatefinish', 'userName']
    this.dataSource = new MatTableDataSource([]);

  }

  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.formBuilders();
    this. list();
    
  }
  formBuilders() {
    this.form = this.fb.group({
      serial: [, [Validators.required]],
      //[,[Validators.required]],
    })

  }

  validador(event: KeyboardEvent){
    if(event.key == 'Tab' || event.key == 'Enter')
    {
      const input: HTMLInputElement = this.searchElement.nativeElement as HTMLInputElement;
      input.value = '';
      input.focus();
      input.select();
      this.save();
    }
  }

  save() {
    this.dryIceS.update().subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != 0) {
          this.form.reset;
          this.alertS.open('Registro creado', 'success');
          this.list();
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
  list(){
    this.dryIceS.listFinish().subscribe(res=>{
      if(res.message === "OK"){
        this.loading= false;
        this.dataSource= new MatTableDataSource<any>(res.object);
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort= this.sort;

      }else{
        this.alertS.open(res.message,'error')
      }
    },err => {
      this.alertS.open(err.message,'error')

    }
    )
  }
  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
}
}
