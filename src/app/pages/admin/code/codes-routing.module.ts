import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CodeAdminComponent } from './code-admin/code-admin.component';
import { CodeAddComponent } from './code-add/code-add.component';

const routes: Routes = [
  { path: 'admin', component: CodeAdminComponent },
  { path: 'add', component: CodeAddComponent },

  { path: '**', redirectTo: 'admin', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CodesRoutingModule {}
