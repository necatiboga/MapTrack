import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { HumidtyTemperaturePopupComponent } from "../humidty-temperature-popup/humidty-temperature-popup.component";
import { TemperaturePopupComponent } from "../temperature-popup/temperature-popup.component";
import { HumidityPopupComponent } from "../humidity-popup/humidity-popup.component";
import { MapComponent } from "../map/map.component";
import { MarkerData, MarkerService } from '../../service/marker.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, HumidtyTemperaturePopupComponent, TemperaturePopupComponent, HumidityPopupComponent, MapComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  cards = new Array(15);

  markers: MarkerData[] = [];
  selectedMarker: MarkerData | undefined;
  selectedMarkerData: MarkerData | undefined;
  searchText: string = '';

  constructor(private markerService: MarkerService) {}

  ngOnInit(): void {
    // this.markers = this.markerService.getMarkers();
    this.markerService.getMarkersInfo().subscribe(markers => {
      console.log("getMarkersInfo().subscribe:: ", markers);
      this.markers = markers;
    });
  }

  onMarkerSelected(markerData: MarkerData): void {
    // console.log(markerData);
    this.selectedMarker = markerData;
  }

  onDeviceClicked(markerData: MarkerData): void {
    this.selectedMarkerData = markerData;
  }

  // Filtrelenmiş marker'ları hesaplayan getter
  get filteredMarkers(): MarkerData[] {
    if (!this.searchText) {
      // console.log("Arama kutusu boş");
      return this.markers; // Arama kutusu boşsa tüm marker'ları göster
    }
    const lowerSearchText = this.searchText.toLowerCase();
    return this.markers.filter(marker =>
      marker.name.toLowerCase().includes(lowerSearchText)
    );
  }

   // Benzersiz bir ID ile marker'ları takip eden fonksiyon
   trackByMarkerId(marker: MarkerData): number {
    return marker.id; // marker.id benzersiz bir kimlik olmalıdır
  }

}
