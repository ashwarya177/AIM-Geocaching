import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { APIUrl } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class CacheLocationService {
  constructor(private http: HttpClient) { }

  // Function to return nearby Cache Locations to the User from the Backend
  getCacheLocationList(boundsSW?: google.maps.LatLng, boundsNE?: google.maps.LatLng): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      params: new HttpParams()
      .set('latSW', boundsSW?.lat() ?? '')
      .set('lonSW', boundsSW?.lng() ?? '')
      .set('latNE', boundsNE?.lat() ?? '')
      .set('lonNE', boundsNE?.lng() ?? '')
    };
    return this.http.get(APIUrl + '/CacheLocation', httpOptions);
  }
}
