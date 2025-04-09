import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CodeAddComponent } from './code-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    ImageCropperModule,

  ],
  declarations: [
    CodeAddComponent
  ],
})
export class PetCreateBasicInfoPageModule {}
