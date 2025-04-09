import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  constructor(private platform: Platform) {}

  obtenerUbicacion(): Observable<GeolocationPosition> {
    return new Observable((observer: Observer<GeolocationPosition>) => {
      const obtenerPosicion = async () => {
        try {
          if (this.platform.is('cordova')) {
            const position = await Geolocation.getCurrentPosition();

            // Convertimos el objeto `Position` de Capacitor a `GeolocationPosition`
            const geoPosition: GeolocationPosition = {
              coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude ?? null,
                altitudeAccuracy: position.coords.altitudeAccuracy ?? null,
                heading: position.coords.heading ?? null,
                speed: position.coords.speed ?? null,
              },
              timestamp: position.timestamp,
            };

            observer.next(geoPosition);
            observer.complete();
          } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                observer.next(position);
                observer.complete();
              },
              (error) => {
                observer.error(error);
              }
            );
          } else {
            observer.error('La geolocalización no está soportada en este navegador.');
          }
        } catch (error) {
          observer.error(error);
        }
      };

      obtenerPosicion();

      const watchId = setInterval(() => {
        obtenerPosicion();
      }, 1000);

      return () => clearInterval(watchId);
    });
  }
}
