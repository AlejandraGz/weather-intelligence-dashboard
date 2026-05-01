import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) { }

  getCurrentPosition(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocalizacion no soportada')
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => reject(error)
      )
    })
  }
  private reverseGeocode(lat: number, lng: number): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    return this.http.get(url);
  }

  getUserLocation(): Observable<{ lat: number; lon: number; city?: string } | null> {
    return from(this.getCurrentPosition()).pipe(
      switchMap(coords =>
        this.reverseGeocode(coords.lat, coords.lng).pipe(
          map((data: any) => {
            const address = data.address;

            return {
              lat: coords.lat,
              lon: coords.lng,
              city:
                address.city ||
                address.town ||
                address.village ||
                address.state
            };
          })
        )
      ),
      catchError(() => of(null))
    );
  }
}

