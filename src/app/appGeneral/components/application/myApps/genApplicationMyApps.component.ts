import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenApplicationEntity } from 'src/app/appGeneral/entities/genApplication.entity';
import { GenApplicationService } from 'src/app/appGeneral/services/genApplication.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-genApplicationMyApps',
  templateUrl: './genApplicationMyApps.component.html',
  styleUrls: ['./genApplicationMyApps.component.css']
})
export class GenApplicationMyAppsComponent implements OnInit {
  genPersonEntity: GenPersonEntity;
  applicationList: GenApplicationEntity[];

  constructor(private genApplicationS: GenApplicationService, public dialog: MatDialog, private alertS: AlertService) { }

  ngOnInit() {
    this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
    this.genApplicationS.findByPersonId(this.genPersonEntity.id).subscribe(res => {
      if (res.message === 'OK') {
        this.applicationList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
}
