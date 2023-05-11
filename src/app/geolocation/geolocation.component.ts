import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from 'googlemaps';
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

  constructor(private cacheLocationService: CacheLocationService) { }

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
      const coordinates = new google.maps.LatLng(latitude, longitude);
      const mapProperties = {
        center: coordinates,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapProperties);
      this.addLocationMarker(coordinates, "You are here!");

      this.findNearbyCacheLocations(latitude, longitude, mapProperties);
    }, () => alert("Unable to retrieve your location"));
  }

  findNearbyCacheLocations(latitude: number, longitude: number, mapProperties: any) {
    this.cacheLocationService.getCacheLocationList(latitude, longitude).subscribe({
      next: (data) => {
        this.cacheList = data;
        this.loadCacheLocationMarkers();
      },
      error: (error) => {
        console.error('Error getting cache locations:', error);
      }
    });
  }

  loadCacheLocationMarkers() {
    this.cacheList.forEach((cacheInfo: { latitude: number; longitude: number; name: string; }) => {
     const coordinates = new google.maps.LatLng(cacheInfo.latitude, cacheInfo.longitude);
     this.addLocationMarker(coordinates, cacheInfo.name);
    });
  }

  addLocationMarker(coordinates: google.maps.LatLng, name: string) {
    //Creating a new marker object
    const marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
      title: name,
    });
    this.addLocationClickEvent(marker);
    //Adding marker to google map
    marker.setMap(this.map??null);
  }

  addLocationClickEvent(marker: google.maps.Marker) {
    //Adding Click event to default marker
    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()??undefined
      });
      infoWindow.open(marker.getMap()??undefined, marker);
    });
  }
}
