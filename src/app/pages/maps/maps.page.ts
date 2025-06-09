import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { UbicacionService } from 'src/app/services/ubication.service';
import { ViewEncapsulation } from '@angular/core';
import { catchError, finalize, Subscription, throwError } from 'rxjs';
import { ClinicService } from 'src/app/services/clinic.service';
import { ToastrService } from 'ngx-toastr';
import { NavController } from '@ionic/angular';

// declare let google: any;

@Component({
    selector: 'app-maps',
    templateUrl: './maps.page.html',
    styleUrls: ['./maps.page.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class MapsPage implements OnInit, OnDestroy, AfterViewInit {
  // @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  // private ubicacionSubscription: Subscription;
  // private markers: google.maps.Marker[] = [];
  // private map: google.maps.Map;
  // private service: google.maps.places.PlacesService;
  // private currentInfoWindow: google.maps.InfoWindow;
  private place: any;

  public selectedOption: string = 'Todos';
  public request: string = 'all';
  public clinics: any[] = [];
  public loading = false;

  constructor(
    private ubicacionService: UbicacionService,
    private clinicService: ClinicService,
    private toastr: ToastrService,
    private navCtrl: NavController
  ) {
    this.request = this.clinicService.getButtons();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // this.loadScripts()
      // .then(() => this.getLocation())
      // .then(() => this.getAllClinics())
      // .catch((error) => console.error('Error al cargar las librerías de Google Maps:', error));
  }

  ngOnDestroy() {
    // if (this.ubicacionSubscription) {
    //   this.ubicacionSubscription.unsubscribe();
    // }
    // if (this.map) {
    //   this.markers.forEach(marker => marker.setMap(null));
    //   this.map = null;
    // }
  }

//   private async loadScripts() {
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBOYnIDyO_2Fy1XkEz9XN_Y_Kv4YTyV1NI&libraries=places`;
//     script.async = true;
//     script.defer = true;
//     document.head.appendChild(script);

//     return new Promise<void>((resolve, reject) => {
//       script.onload = () => resolve();
//       script.onerror = () => reject();
//     });
//   }

//   private async getLocation() {
//     this.ubicacionSubscription = this.ubicacionService.obtenerUbicacion().subscribe(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         this.initMap(latitude, longitude);
//       },
//       (error) => {
//         if (error.code === error.PERMISSION_DENIED) {
//           this.navCtrl.navigateRoot('/private/pages/care');
//         } else {
//           this.toastr.info('No logramos acceder a tu ubicación.');
//         }
//       }
//     );
//   }

//   private initMap(lat: number, lng: number) {
//     if (!google.maps) return;

//     const position = new google.maps.LatLng(lat, lng);
//     const options = {
//       center: position,
//       zoom: 16,
//       mapId: 'DEMO_MAP_ID',
//       disableDefaultUI: true,
//     };

//     this.map = new google.maps.Map(this.mapRef.nativeElement, options);

//     const marker = new google.maps.Marker({
//       map: this.map,
//       position: { lat, lng },
//     });

//     this.service = new google.maps.places.PlacesService(this.map);

//     // this.searchNearbyVets(position);
//     this.showClinicsOnMap();
//   }

//   private async showClinicsOnMap() {
//     if (!this.map) return;

//     const svgMarker = {
//       path: 'M7.352,21.409C1.151,12.42,0,11.5,0,8.194a8.194,8.194,0,0,1,16.387,0c0,3.3-1.151,4.226-7.352,13.215a1.025,1.025,0,0,1-1.684,0Zm.842-9.8A3.414,3.414,0,1,0,4.78,8.194,3.414,3.414,0,0,0,8.194,11.608Z',
//       fillColor: 'Red',
//       fillOpacity: 1,
//       strokeWeight: 0,
//       rotation: 0,
//       scale: 2,
//       anchor: new google.maps.Point(0, 20),
//     };

//     for (const clinic of this.clinics) {
//       try {
//         const location = await this.clinicService.geocodeAddress(clinic.vicinity).toPromise();
//         clinic.location = location;

//         const marker = new google.maps.Marker({
//           map: this.map,
//           position: location,
//           icon: svgMarker,
//         });

//         marker.addListener('click', () => {
//           this.showClinicCard(clinic);
//           this.place = clinic;
//         });

//         this.markers.push(marker);
//       } catch (error) {
//         console.error('Error al mostrar clínicas en el mapa:', error);
//       }
//     }
//   }

//   // private searchNearbyVets(position: google.maps.LatLng) {
//   //   const request = {
//   //     location: position,
//   //     radius: 10000,
//   //     type: 'veterinary_care',
//   //   };

//   //   this.service.nearbySearch(request, (results, status) => {
//   //     if (status === google.maps.places.PlacesServiceStatus.OK) {
//   //       results.forEach(result => this.createCustomMarker(result));
//   //     }
//   //   });
//   // }

//   // private async createCustomMarker(place: google.maps.places.PlaceResult) {
//   //   const svgMarker = {
//   //     path: 'M7.352,21.409C1.151,12.42,0,11.5,0,8.194a8.194,8.194,0,0,1,16.387,0c0,3.3-1.151,4.226-7.352,13.215a1.025,1.025,0,0,1-1.684,0Zm.842-9.8A3.414,3.414,0,1,0,4.78,8.194,3.414,3.414,0,0,0,8.194,11.608Z',
//   //     fillColor: 'Red',
//   //     fillOpacity: 1,
//   //     strokeWeight: 0,
//   //     rotation: 0,
//   //     scale: 2,
//   //     anchor: new google.maps.Point(0, 20),
//   //   };

//   //   const marker = new google.maps.Marker({
//   //     map: this.map,
//   //     position: place.geometry.location,
//   //     icon: svgMarker,
//   //   });

//   //   marker.addListener('click', () => {
//   //     // this.showInfoWindow(place);
//   //     this.place = place;
//   //   });

//   //   this.markers.push(marker);
//   // }

//   // private showInfoWindow(place: google.maps.places.PlaceResult) {
//   //   this.place = place;
//   //   const compoundCode = place.plus_code.compound_code.split(' ').slice(1).join(' ');
//   //   this.place.plus_code.compound_code = compoundCode;

//   //   const content = `
//   //     <div class="vet-container">
//   //       <div class="vet-info">
//   //         <img class="vet-profile" src="/assets/vets/logo_cuidame-min.svg" alt="" />
//   //       </div>
//   //       <div class="vet-info">
//   //         <div class="info">
//   //           <label class="vet-title">${place.name}</label>
//   //           <label class="vet-desc">Nombre</label>
//   //         </div>
//   //         <div class="info">
//   //           <label class="vet-title">${place.plus_code.compound_code}</label>
//   //           <label class="vet-desc">Ubicación</label>
//   //         </div>
//   //         <div class="info">
//   //           <label class="vet-title">${place.vicinity}</label>
//   //           <label class="vet-desc">Dirección</label>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   `;

//   //   const infoWindow = new google.maps.InfoWindow({
//   //     content: content,
//   //   });

//   //   if (this.map && place.geometry && place.geometry.location) {
//   //     if (this.currentInfoWindow) {
//   //       this.currentInfoWindow.close();
//   //     }
//   //     infoWindow.setPosition(place.geometry.location);
//   //     infoWindow.open(this.map);
//   //     this.currentInfoWindow = infoWindow;
//   //   }
//   // }

//   private async getAllClinics() {
//     this.loading = true;

//     this.clinicService.getAllClinics().pipe(
//       catchError((error) => {
//         console.error('Error al obtener las clínicas:', error);
//         return throwError(error);
//       }),
//       finalize(() => (this.loading = false))
//     ).subscribe((clinics: any[]) => {
//       this.clinics = clinics;
//       this.showClinicsOnMap();
//     });
//   }

//   selectOption(option: string) {
//     this.selectedOption = option;
//   }

//   clearMarkers() {
//     this.markers.forEach(marker => marker.setMap(null));
//     this.markers = [];
//   }

//   async updateMarkers(clinics: any[]) {
//     this.clearMarkers();
//     clinics.forEach((clinic) => {
//       const marker = new google.maps.Marker({
//         map: this.map,
//         position: clinic.position,
//         title: clinic.clinic_name,
//         label: clinic.services.join(', '),
//       });
//       this.markers.push(marker);
//     });
//   }

//   showAllClinics() {
//     this.updateMarkers(this.clinics);
//   }

//   showClinicsByService(service: string) {
//     const clinicsWithService = this.clinics.filter(clinic =>
//       clinic.services.includes(service)
//     );
//     this.updateMarkers(clinicsWithService);
//   }

//   async locateUser() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         const newPosition = new google.maps.LatLng(latitude, longitude);
//         this.map.setCenter(newPosition);
//       });
//     } else {
//       this.toastr.info('Intenta más tarde.');
//     }
//   }

//   showClinicCard(clinic: any) {
//     const content = `
//       <div class="vet-container">
//         <div class="vet-info">
//           <img class="vet-profile" src="/assets/vets/logo_cuidame-min.svg" alt="" />
//         </div>
//         <div class="vet-info">
//           <div class="info">
//             <label class="vet-title">${clinic.clinic_name}</label>
//             <label class="vet-desc">Nombre</label>
//           </div>
//           <div class="info">
//             <label class="vet-title">${clinic.vicinity}</label>
//             <label class="vet-desc">Dirección</label>
//           </div>
//         </div>
//       </div>
//     `;

//     const infoWindow = new google.maps.InfoWindow({
//       content: content,
//     });

//     if (this.map && clinic.location) {
//       if (this.currentInfoWindow) {
//         this.currentInfoWindow.close();
//       }
//       infoWindow.setPosition(clinic.location);
//       infoWindow.open(this.map);
//       this.currentInfoWindow = infoWindow;
//     }
//   }
}
