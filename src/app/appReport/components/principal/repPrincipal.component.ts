import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { RepReportService } from '../../services/repReport.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenSectionEntity } from 'src/app/appGeneral/entities/genSection.entity';
import { GenSectionService } from 'src/app/appGeneral/services/genSection.service';
import { GenModuleEntity } from 'src/app/appGeneral/entities/genModule.entity';
import { GenModuleService } from 'src/app/appGeneral/services/genModule.service';
import { Router } from '@angular/router';
import { RepReportEntity } from '../../entities/repReport.entity';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { GenApplicationService } from 'src/app/appGeneral/services/genApplication.service';
import { GenApplicationEntity } from 'src/app/appGeneral/entities/genApplication.entity';
import { MatDialog } from '@angular/material/dialog';
import { CustomerModal } from 'src/app/appGeneral/modals/customer/customer.modal';
import { GenProfileEntity } from 'src/app/appGeneral/entities/genProfile.entity';
import { GenApplicationPersonProfileService } from 'src/app/appGeneral/services/genApplicationPersonProfile.service';
import { UpdatePasswordComponent } from 'src/app/shared/components/updatePassword/updatePassword.component';

@Component({
  selector: 'app-repPrincipal',
  templateUrl: './repPrincipal.component.html',
  styleUrls: ['./repPrincipal.component.css']
})
export class RepPrincipalComponent implements OnInit {
  isOpen: boolean = true;
  reportName: string;
  open: string = '';
  height: string;
  photo: string;
  @ViewChild('sidenavContent') scroll: ElementRef;
  genPersonEntity: GenPersonEntity;
  genProfileEntity: GenProfileEntity;
  applicationList: GenApplicationEntity[];
  sectionList: GenSectionEntity[];
  moduleList: GenModuleEntity[];
  reportList: RepReportEntity[];
  optionList: any[];
  countryId: string;

  constructor(private router: Router, private render: Renderer2, private dialog: MatDialog, private genApplicationPersonProfileS: GenApplicationPersonProfileService, private genApplicationS: GenApplicationService, private genSectionS: GenSectionService, private genModuleS: GenModuleService, private repReportS: RepReportService, private genPersonS: GenPersonService, private alertS: AlertService) {
    this.isOpen = true;
    this.photo = "./assets/images/Photo_1.png";
    this.sectionList = [];
    this.moduleList = [];
    this.optionList = [];
    this.countryId = "";
  }

  ngOnInit() {
    window.document.title = 'Reportes';
    window.addEventListener('storage', function (e) {
      if (e.key === 'user' && e.newValue === null) {
        window.location.href = "";
      } else if (e.key === 'token' && e.newValue === null) {
        window.location.href = "";
      }
    });
    this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
    this.countryId =localStorage.getItem('countryId');
    this.findImage();
    this.genApplicationS.findByPersonId(this.genPersonEntity.id).subscribe(res => {
      if (res.message === 'OK') {
        this.applicationList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    this.openDialogCustomer();
  }
  goWoden() {
    window.location.href = 'https://www.woden.com.co/';
  }
  openDialogCustomer() {
    this.optionList = [];
    const dialogRef = this.dialog.open(CustomerModal, {
      data:{personId:this.genPersonEntity.id}
    });
    dialogRef.afterClosed().subscribe(r => {
      localStorage.setItem('customerId', JSON.stringify(r));
      this.genApplicationPersonProfileS.listProfile(this.genPersonEntity.id, 'REPORTES').subscribe(res => {
        if (res.message === 'OK') {
          this.genProfileEntity = res.object;
          if (this.genProfileEntity != null) {
            this.genSectionS.findByProfileId(this.genProfileEntity.id).subscribe(res => {
              if (res.message === 'OK') {
                this.sectionList = res.object;
              } else {
                this.alertS.open(res.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
            this.genModuleS.findByProfileId(this.genProfileEntity.id, 'REPORTES').subscribe(res => {
              if (res.message === 'OK') {
                this.moduleList = res.object;
                this.repReportS.findByPersonId(this.genPersonEntity.id, this.countryId).subscribe(res => {
                  if (res.message === 'OK') {
                    this.reportList = res.object;
                    this.optionList.push(this.moduleList);
                    this.optionList.push(this.reportList);
                  } else {
                    this.alertS.open(res.message, 'error');
                  }
                }, err => {
                  this.alertS.open(err.message, 'error');
                });
              } else {
                this.alertS.open(res.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    });
  }
  onToogle() {
    this.isOpen = !this.isOpen;
  }
  enableScroll() {
    this.render.setStyle(this.scroll.nativeElement, 'overflow-y', 'auto');
  }
  disableScroll() {
    setTimeout(() => {
      this.render.setStyle(this.scroll.nativeElement, 'overflow-y', 'hidden');
    }, 500);
  }
  onClick(value) {
    this.height = (document.getElementById('module_' + value).children.length * 40) + 'px';
    if (this.open === '' || this.open != value) {
      this.open = value;
    } else if (this.open === value) {
      this.open = '';
    }
  }
  loadImage(image: FileList) {
    this.genPersonS.loadImage(this.genPersonEntity.id, image[0]).subscribe(res => {
      if (res.message === 'OK') {
        this.findImage();
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  findImage() {
    this.genPersonS.findImage(this.genPersonEntity.id).subscribe(res => {
      if (res.message === "OK") {
        if (res.object != null) {
          this.photo = "data:image/png;base64," + res.object;
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  
  logout() {
    this.genPersonS.logOut().subscribe(res => {
    if (res.message== "OK") {
      this.alertS.open('Salida Exitosa', 'success');
    } else {
      this.alertS.open('Error al cerrar sesión', 'error');
    }
  }, err => {
    this.alertS.open(err.message, 'error');
  });
  localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('customerId');
    localStorage.removeItem('tokenSap');
    localStorage.removeItem('countryId');
    this.router.navigate(['']);
  }
  updatePassword(){
    this.dialog.open(UpdatePasswordComponent,{
      data:{id:this.genPersonEntity.id}
    });
  }
}
