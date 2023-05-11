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
  getCacheLocationList(userLatitude: number, userLongitude: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      params: new HttpParams()
      .set('lat', userLatitude)
      .set('lon', userLongitude)
    };
    return this.http.get(APIUrl + '/CacheLocation', httpOptions);
  }
}
