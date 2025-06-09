import { ManagementPage } from './management/management.page';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsPagesRoutingModule } from './pets-pages-routing.module';
import { PetCareOptionsPage } from './pet-care-options/pet-care-options.page';
import { GreetingComponent } from 'src/app/components/greeting/greeting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VeterinariansPage } from './veterinarians/veterinarians.page';
import { WompiPaymentComponent } from './wompi-payment/wompi-payment.component';
import { DateTimePipe } from 'src/app/utils/dateTimePipe';
import { HomePage } from './home/home.page';
import { ResizeTextDirective } from 'src/app/resize-text.directive';
import { NgApexchartsModule } from 'ng-apexcharts';




@NgModule({
  // schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    ManagementPage,
    PetCareOptionsPage,
    GreetingComponent,
    VeterinariansPage,
    WompiPaymentComponent,
    DateTimePipe,
    HomePage,

  ],
  imports: [
    CommonModule,
    PetsPagesRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ResizeTextDirective,
    NgApexchartsModule,

  ]
})
export class PetsPagesModule { }
