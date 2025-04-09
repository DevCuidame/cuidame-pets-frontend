import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CodeAdminComponent } from './code-admin/code-admin.component';
import { CodeAddComponent } from './code-add/code-add.component';
import { CodesRoutingModule } from './codes-routing.module';

@NgModule({
  declarations: [
    CodeAddComponent,
    CodeAdminComponent,
  ],
  imports: [
    CommonModule,
    CodesRoutingModule,
    // NgxPaginationModule,
    FormsModule,
    RouterModule
  ],
})
export class CodeModule {}
