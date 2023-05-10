import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {} from 'googlemaps';
import { CacheLocationService } from '../services/cache-location.service';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.less']
})
export class GeolocationComponent {
  @ViewChild('map', {static: false}) mapContainer: any;
  map: google.maps.Map | undefined;
  cacheList:any = [];

  constructor(private cacheLocationService: CacheLocationService) {
    this.cacheLocationService.getCacheLocationList().subscribe(data =>{
      this.cacheList = data;
    });
  }
  ngOnInit() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      this.map = undefined; // hide the map when geolocation is not supported
    } else {
      this.geoFindMe();
    }
  }

  geoFindMe() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      const mapProperties = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapProperties);
    }, () => alert("Unable to retrieve your location"));
  }
}
