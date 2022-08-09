import { ActiveFixedTypeEntryService } from './../../../services/activeFixedTypeEntry.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActiveFixedEntity } from 'src/app/appActiveFixed/entities/activeFixed.entity';



@Component({
  selector: 'app-actFeaturesTypeEntryNew',
  templateUrl: './actFeaturesTypeEntryNew.component.html',
  styleUrls: ['./actFeaturesTypeEntryNew.component.css']
})
export class ActFeaturesTypeEntryComponent implements OnInit {
  public loading: boolean;
  @Input() ActFixTypeEntryformId: number;
  @Output() closeDialog = new EventEmitter<any>();
  dataSource = new MatTableDataSource<any>();
  title:string;
  
  fileList: File[];
  dataSourceCouting = new MatTableDataSource<any>();
  dataSourceSerials = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorCouting') paginatorCouting: MatPaginator;
  @ViewChild('paginatorSerials') paginatorSerials: MatPaginator;
  form: FormGroup;
  activeFixedEntity:ActiveFixedEntity
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private activeFixedTypeEntryS:ActiveFixedTypeEntryService) {
    this.ActFixTypeEntryformId = 0;
  
    this.dataSource = new MatTableDataSource([]);
  }
  ngOnInit(): void {
    this.formBuilders();
  }

  formBuilders(){
    this.form= this.fb.group({
      id: [,[]],
      name:[,[Validators.required]],
      active: [,[]]
      //[,[Validators.required]],
    })

  }
 
  save() {
    if(this.ActFixTypeEntryformId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.activeFixedTypeEntryS.create(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Registro creado!','success');
          }else{
            this.alertS.open(res.message,'error');
          }
        }else{
          this.alertS.open(res.message,'error');
        }        
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else{
     
    }       
  }


  

 
 




 
}




