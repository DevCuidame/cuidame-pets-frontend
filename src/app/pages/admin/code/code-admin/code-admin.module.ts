import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CodeAdminComponent } from './code-admin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    ImageCropperModule,

  ],
  declarations: [
    CodeAdminComponent
  ],
})
export class PetCreateBasicInfoPageModule {}
