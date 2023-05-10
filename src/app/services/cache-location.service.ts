import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CacheLocationService {
  readonly APIUrl = "https://localhost:7159/api";
  constructor(private http: HttpClient) { }

  getCacheLocationList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get(this.APIUrl + '/CacheLocation', httpOptions);
  }
}
