import { ContainerModule } from './modules/container/contenedor.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FormsModule } from '@angular/forms';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorWebModule } from './modules/doctorweb/doctor-web.module';
import { NgApexchartsModule } from 'ng-apexcharts';

//Angular material

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [ContainerModule,
        DoctorWebModule,
        BrowserModule,
        NgApexchartsModule,
        ToastrModule.forRoot(),
        IonicModule.forRoot(),
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        IonicStorageModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000',
        })], providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        Geolocation,
        OneSignal,
        InAppBrowser,
        File,
        Camera,
        ImagePicker,
        Network,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {}
