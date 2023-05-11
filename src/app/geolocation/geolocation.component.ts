import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { CacheLocationService } from '../services/cache-location.service';
import { take } from 'rxjs';

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
      alert("Location is not supported by your browser or is disabled.");
      // Hide the map when geolocation is not supported
      this.map = undefined; 
    } else {
      this.geoFindMe();
    }
  }

  geoFindMe() {
    // Get Current location of user
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const coordinates = new google.maps.LatLng(latitude, longitude);
      
      // Google Map for UI with default marker set at user's current location
      const mapProperties = {
        center: coordinates,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapProperties);
      this.addLocationMarker(coordinates, "You are here!");
      
      // Find the nearby Cache Locations
      this.findNearbyCacheLocations(latitude, longitude);
    }, () => alert("Unable to retrieve your location"));
  }

  findNearbyCacheLocations(latitude: number, longitude: number) {
    // Call Backend to get nearby Cache List
    this.cacheLocationService.getCacheLocationList(latitude, longitude).pipe(take(1)).subscribe({
      next: (data) => {
        this.cacheList = data;
        // Add Map markers for all cache locations in cacheList
        this.loadCacheLocationMarkers();
      },
      error: (error) => {
        console.error('Error getting cache locations:', error);
      }
    });
  }

  loadCacheLocationMarkers() {
    this.cacheList.forEach((cacheInfo: { latitude: number; longitude: number; name: string; hash: string;}) => {
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
