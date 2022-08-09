import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenApplicationService } from 'src/app/appGeneral/services/genApplication.service';
import { GenApplicationEntity } from 'src/app/appGeneral/entities/genApplication.entity';

@Component({
  selector: 'app-genApplicationNew',
  templateUrl: './genApplicationNew.component.html',
  styleUrls: ['./genApplicationNew.component.css']
})
export class GenApplicationNewComponent implements OnInit {
  @Input()applicationId:number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  genApplicationEntity:GenApplicationEntity;
  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    icon: new FormControl('', Validators.required),
    color: new FormControl('#ffffff', Validators.required),
    link: new FormControl('', Validators.required),
    active: new FormControl('')
  });

  constructor(private genApplicationS:GenApplicationService,private alertS:AlertService) {
    this.applicationId=0;
  }
  ngOnInit() {
    if(this.applicationId != 0){
      this.title="Editar Aplicacion";
      this.genApplicationS.findById(this.applicationId).subscribe(res=>{
        if(res.message==='OK'){
          this.genApplicationEntity=res.object;
          this.form.setValue(
            {
              'id':this.genApplicationEntity.id,
              'name':this.genApplicationEntity.name,
              'icon':this.genApplicationEntity.icon,
              'color':this.genApplicationEntity.color,
              'link':this.genApplicationEntity.link,
              'active':this.genApplicationEntity.active
            }
          );
        }else{
          this.alertS.open(res.message,'error');
        }
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else{
      this.title="Nueva Aplicacion";
    }
  }
  onClick(){
    if(this.applicationId===0){
      this.genApplicationS.create(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Aplicacion creada!','success');
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
      this.genApplicationS.update(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Aplicacion actualizada!','success');
          }else{
            this.alertS.open(res.message,'error');
          }
        }else{
          this.alertS.open(res.message,'error');
        }        
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }    
  }
}
