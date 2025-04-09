import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupPage } from './signup/signup.page';

const routes: Routes = [
  { path: 'signup', component: SignupPage },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class VetsRoutingModule {}
