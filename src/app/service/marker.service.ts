import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MarkerData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  temperature: number;
  humidity: number;
}

@Injectable({
  providedIn: 'root'
})

export class MarkerService {
  private markers: MarkerData[] = [];
  private markersSubject: BehaviorSubject<MarkerData[]> = new BehaviorSubject<MarkerData[]>([]);
  private markersInfo$: Observable<MarkerData[]> = this.markersSubject.asObservable();

  
  constructor() {
    this.generateMarkers(); // Rastgele marker'lar oluştur
  }

  // Rastgele marker'lar oluşturma
  private generateMarkers() {
    if (this.markersSubject.getValue().length === 0) {
      for (let i = 1; i <= 10; i++) {
        let marker = {
          id: i,
          name: `Marker ${i}`,
          latitude: this.getRandomLatitude(),
          longitude: this.getRandomLongitude(),
          temperature: this.getRandomTemperature(),
          humidity: this.getRandomHumidity()
        };
        this.markers.push(marker);
        this.markersSubject.next([...this.markersSubject.getValue(), marker]);
    }
      // this.markers.push({
      //   id: i,
      //   name: `Marker ${i}`,
      //   latitude: this.getRandomLatitude(),
      //   longitude: this.getRandomLongitude(),
      //   temperature: this.getRandomTemperature(),
      //   humidity: this.getRandomHumidity()
      // });
    }
  }

  // Marker listesini döndür
  getMarkersInfo(): Observable<MarkerData[]> {
    return this.markersInfo$;
  }

  getMarkers(): MarkerData[] {
    return this.markers;
  }


//  updateMarker(markerData: MarkerData): void {
//     const markers = this.markersSubject.getValue();
//     const index = markers.findIndex(marker => marker.id === markerData.id);

//     if (index !== -1) {
//       markers[index] = markerData;
//       this.markersSubject.next([...markers]);
//     }
//   }

    updateMarker(markerData: MarkerData) {
      console.log("MarkerData: ", markerData)
      const updatedMarkers = this.markersSubject.getValue().map(marker =>
        marker.id === markerData.id ? { ...markerData } : marker
      );
      this.markersSubject.next([...updatedMarkers]);
    }

  /*
  getMarkers(): MarkerData[] {
    return this.markers;
  }
  */
  // Türkiye'deki rastgele enlem (latitude) döndüren fonksiyon
  private getRandomLatitude(): number {
    const minLat = 36.0; // Türkiye'nin güney sınırı
    const maxLat = 42.1; // Türkiye'nin kuzey sınırı
    return Math.random() * (maxLat - minLat) + minLat;
  }

  // Türkiye'deki rastgele boylam (longitude) döndüren fonksiyon
  private getRandomLongitude(): number {
    const minLon = 26.0; // Türkiye'nin batı sınırı
    const maxLon = 45.0; // Türkiye'nin doğu sınırı
    return Math.random() * (maxLon - minLon) + minLon;
  }

  private getRandomTemperature(): number {
    return Math.floor(Math.random() * 41) - 10; // -10 ile 30 derece arasında rastgele sıcaklık
  }

  private getRandomHumidity(): number {
    return Math.floor(Math.random() * 101); // 0 ile 100 arasında rastgele nem
  }
}
