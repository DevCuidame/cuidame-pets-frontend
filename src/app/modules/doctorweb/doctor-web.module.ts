import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DoctorHeaderLandComponent } from './land/doctor-header-land/doctor-header-land.component';
import { DoctorContainerLandComponent } from './land/doctor-container-land/doctor-container-land.component';
import { DoctorTabBarLandComponent } from './land/doctor-tab-bar-land/doctor-tab-bar-land.component';



@NgModule({
  declarations: [
    DoctorHeaderLandComponent,
    DoctorContainerLandComponent,
    DoctorTabBarLandComponent
  ],
  imports: [CommonModule, RouterModule, IonicModule],
  exports: [DoctorHeaderLandComponent],
})
export class DoctorWebModule {}
