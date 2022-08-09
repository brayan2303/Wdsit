import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { PriLabelModel } from '../../models/priLabel.model';
import { PriLabelService } from '../../services/priLabel.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerModal } from 'src/app/appGeneral/modals/customer/customer.modal';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenSectionEntity } from 'src/app/appGeneral/entities/genSection.entity';
import { GenSectionService } from 'src/app/appGeneral/services/genSection.service';
import { GenModuleService } from 'src/app/appGeneral/services/genModule.service';
import { GenModuleEntity } from 'src/app/appGeneral/entities/genModule.entity';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { GenApplicationService } from 'src/app/appGeneral/services/genApplication.service';
import { GenApplicationEntity } from 'src/app/appGeneral/entities/genApplication.entity';
import { GenProfileEntity } from 'src/app/appGeneral/entities/genProfile.entity';
import { GenApplicationPersonProfileService } from 'src/app/appGeneral/services/genApplicationPersonProfile.service';
import { UpdatePasswordComponent } from 'src/app/shared/components/updatePassword/updatePassword.component';

@Component({
  selector: 'app-priPrincipal',
  templateUrl: './priPrincipal.component.html',
  styleUrls: ['./priPrincipal.component.css']
})
export class PriPrincipalComponent implements OnInit {
  isOpen: boolean;
  open: string = '';
  height: string;
  photo: string;
  @ViewChild('sidenavContent') scroll: ElementRef;
  applicationList: GenApplicationEntity[];
  sectionList: GenSectionEntity[];
  moduleList: GenModuleEntity[];
  labelList: PriLabelModel[];
  optionList: any[];
  genPersonEntity: GenPersonEntity;
  genProfileEntity: GenProfileEntity;
  customerId: number;

  constructor(private router: Router, private render: Renderer2, private dialog: MatDialog, private genApplicationPersonProfileS: GenApplicationPersonProfileService, private genApplicationS: GenApplicationService, private genPersonS: GenPersonService, private priLabelS: PriLabelService, private genSectionS: GenSectionService, private genModuleS: GenModuleService, private alertS: AlertService) {
    this.isOpen = true;
    this.photo = "./assets/images/Photo_1.png";
    this.sectionList = [];
    this.moduleList = [];
    this.optionList = [];
  }

  ngOnInit() {
    window.document.title = 'Impresion';
    window.addEventListener('storage', function (e) {
      if (e.key === 'user' && e.newValue === null) {
        window.location.href = "";
      } else if (e.key === 'token' && e.newValue === null) {
        window.location.href = "";
      }
    });
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
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
      localStorage.setItem('customerId', r);
      this.genApplicationPersonProfileS.listProfile(this.genPersonEntity.id, 'IMPRESION').subscribe(res => {
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
            this.genModuleS.findByProfileId(this.genProfileEntity.id, 'IMPRESION').subscribe(res => {
              if (res.message === 'OK') {
                this.moduleList = res.object;
                this.optionList.push(this.moduleList);
                this.priLabelS.findByCustomerId(r).subscribe(res => {
                  if (res.message === 'OK') {
                    this.labelList = res.object;
                    this.optionList.push(this.labelList);
                    this.customerId = r;
                    this.router.navigate(['/priPrincipal']);
                    this.open = '';
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
    localStorage.removeItem('proyect');
    this.router.navigate(['']);
  }
  updatePassword(){
    this.dialog.open(UpdatePasswordComponent,{
      data:{id:this.genPersonEntity.id}
    });
  }
}
