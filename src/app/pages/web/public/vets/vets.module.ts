import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VetsRoutingModule } from './vets-routing.module';
import { SignupPage } from './signup/signup.page';

@NgModule({
  declarations: [
    SignupPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    VetsRoutingModule,
    FormsModule,
    RouterModule,
  ],
})
export class VetsModule {}
