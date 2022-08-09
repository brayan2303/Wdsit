import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenCenterCostEntity } from 'src/app/appGeneral/entities/genCenterCost.entity';
import { GenCenterCostService } from 'src/app/appGeneral/services/genCenterCost.service';
import { GenSegmentService } from 'src/app/appGeneral/services/genSegment.service';
import { GenSegmentEntity } from 'src/app/appGeneral/entities/genSegment.entity';

@Component({
  selector: 'app-genCenterCostNew',
  templateUrl: './genCenterCostNew.component.html',
  styleUrls: ['./genCenterCostNew.component.css']
})
export class GenCenterCostNewComponent implements OnInit {
  @Input() centerCostId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  genCenterCostEntity: GenCenterCostEntity;
  segmentList:GenSegmentEntity[];
  form = new FormGroup({
    id: new FormControl(''),
    code: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    segmentId: new FormControl('', Validators.required),
    incomeActive: new FormControl(''),
    active: new FormControl(''),
  });
  constructor(private genCenterCostS: GenCenterCostService,private genSegmentS:GenSegmentService, private alertS: AlertService) {
    this.centerCostId=0;
  }

  ngOnInit(): void {
    this.genSegmentS.findAll().subscribe(res=>{
      if(res.message==='OK'){
        this.segmentList=res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
    if (this.centerCostId != 0) {
      this.title = "Editar Centro de Costo";
      this.genCenterCostS.findById(this.centerCostId).subscribe(res => {
        if (res.message === 'OK') {
          this.genCenterCostEntity = res.object;
          this.form.setValue(
            {
              'id': this.genCenterCostEntity.id,
              'code': this.genCenterCostEntity.code,
              'description':this.genCenterCostEntity.description,
              'segmentId':this.genCenterCostEntity.segmentId,
              'incomeActive':this.genCenterCostEntity.incomeActive,
              'active': this.genCenterCostEntity.active,
            }
          );
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = "Nuevo Centro de Costo";
    }
  }
  onClick() {
    if (this.centerCostId === 0) {
      this.genCenterCostS.create(this.form.value.name).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Centro de Costo creado!', 'success');
          } else {
            this.alertS.open(res.message, 'error');
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.genCenterCostS.update(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Centro de Costo actualizado!', 'success');
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
  }
}
