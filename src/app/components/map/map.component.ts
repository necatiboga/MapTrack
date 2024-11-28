import { Component, ComponentFactoryResolver, Input, OnInit, Output, SimpleChanges, ViewContainerRef } from '@angular/core';
import * as L from 'leaflet';
import { HumidityPopupComponent } from '../humidity-popup/humidity-popup.component';
import { HumidtyTemperaturePopupComponent } from '../humidty-temperature-popup/humidty-temperature-popup.component';
import { TemperaturePopupComponent } from '../temperature-popup/temperature-popup.component';
import { MarkerData, MarkerService } from '../../service/marker.service';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit{
  @Input() selectedMarkerData: MarkerData | undefined;
  @Output() selectedMarker = new EventEmitter<any>();

  private map: L.Map | undefined;
  private markers: MarkerData[] = [];
  private markersOnMap: L.Marker[] = [];  // Marker'ları saklamak için bir array

  constructor(
    private resolver: ComponentFactoryResolver, // FactoryResolver kullanarak component'i dinamik olarak oluşturacağız
    private container: ViewContainerRef, // Bu, Angular component'ini DOM'a yerleştirmemize olanak sağlar
    private markerService: MarkerService
  ) {}

  ngOnInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.selectedMarkerData && this.map) {
      // Haritadaki marker'ları tarıyoruz
      const selectedMarker = this.markersOnMap.find(
        (marker) =>
          marker.getLatLng().lat === this.selectedMarkerData?.latitude &&
          marker.getLatLng().lng === this.selectedMarkerData?.longitude
      );
  
      // Eşleşen marker bulunduysa
      if (selectedMarker) {
        // Marker'ın popup'ını açıyoruz
        selectedMarker.fire('click'); // Programatik olarak tıklama olayı tetikleniyor
      }
    }
  }

  private initMap(): void {
    // Haritayı başlat
    // this.map = L.map('map').setView([37.7749, -122.4194], 13); // Koordinatlar (San Francisco) ve zoom seviyesi
    this.map = L.map('map').setView([39.9334, 32.8597], 6); // Koordinatlar (Türkiye, Ankara) ve zoom seviyesi
    
    // OpenStreetMap katmanını ekle
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl: '/map-pin.svg',  // SVG dosyasının yolu
      iconSize: [50, 50],  // İkonun boyutu
      iconAnchor: [16, 32],  // İkonun hangi kısmını harita üzerindeki noktaya yerleştireceksiniz
      popupAnchor: [0, -32]  // Popup'ın hangi kısımdan açılacağını ayarlayın
    });

    // Haritaya bir marker ekle
    // L.marker([39.9334, 32.8597], { icon: customIcon })
    //   .addTo(this.map)
    //   .bindPopup('San Francisco')
    //   .openPopup();
    /*
    for (let i = 0; i < 8; i++) {
      const lat = this.getRandomLatitude(); // Rastgele enlem
      const lon = this.getRandomLongitude(); // Rastgele boylam

      const marker = L.marker([lat, lon], { icon: customIcon }).addTo(this.map);

      marker.on('click', () => {
        // this.map?.setView(marker.getLatLng(), 6);
        this.openPopup(marker); // Marker'a tıklandığında popup'ı aç
      })
    }
    */
    // this.markers  = this.markerService.getMarkers();
    this.markerService.getMarkersInfo().subscribe(markers => {
      this.markers = markers;
    });

    for (const markerData of this.markers ) {
      const marker = L.marker([markerData.latitude, markerData.longitude], { icon: customIcon }).addTo(this.map);
      // Marker'ı array'ye ekliyoruz
      this.markersOnMap.push(marker);

      marker.on('click', () => {
        this.map?.setView(marker.getLatLng(), 7);
        this.selectedMarker.emit({ ...markerData });
        this.openPopup(marker, markerData);
      });
    }
  }

  private openPopup(marker: L.Marker, markerData: MarkerData): void {
    if (marker.getPopup()) {
      marker.unbindPopup();
    }
    // this.container.clear();
    // İlk popup için içerik oluştur
    const popupContent = document.createElement('div');
    const factory = this.resolver.resolveComponentFactory(HumidtyTemperaturePopupComponent);
    const componentRef = this.container.createComponent(factory);
  
    // Angular bileşenini popup içerik alanına ekle
    componentRef.changeDetectorRef.detectChanges();
    popupContent.appendChild(componentRef.location.nativeElement);
    
    // Marker'a özel bilgileri popup'a geçir
    componentRef.instance.markerData = markerData;  // Bu satır ile markerData'yı component'e geçiriyoruz

    // İlk popup'ı manuel olarak oluştur
    const humidityPopup = L.popup()
      .setLatLng(marker.getLatLng())
      .setContent(popupContent);
  
    // Marker üzerine popup'ı ekle ve aç
    marker.bindPopup(humidityPopup).openPopup();
  
    // Butona tıklama durumunda, ikinci popup'ı aç
    componentRef.instance.temperatureSettingsClicked.subscribe(() => {
      // İlk popup'ı kapat
      marker.closePopup(); // Argümansız çağrı!
      this.openDetailTemperaturePopup(marker, markerData);
    });

    componentRef.instance.humiditySettingsClicked.subscribe(() => {
      // İlk popup'ı kapat
      marker.closePopup(); // Argümansız çağrı!
      this.openDetailHumidityPopup(marker , markerData);
    });
  }
  
  private openDetailTemperaturePopup(marker: L.Marker, markerData: MarkerData): void {
    
    // İkinci popup için içerik oluştur
    const popupContent = document.createElement('div');
    const factory = this.resolver.resolveComponentFactory(TemperaturePopupComponent);
    const componentRef = this.container.createComponent(factory);
  
    // Angular bileşenini popup içerik alanına ekle
    popupContent.appendChild(componentRef.location.nativeElement);
  
    // Marker'a özel bilgileri popup'a geçir
    componentRef.instance.markerData = markerData;  // Bu satır ile markerData'yı component'e geçiriyoruz


    // İkinci popup'ı manuel olarak oluştur ve göster
    const detailPopup = L.popup()
      .setLatLng(marker.getLatLng())
      .setContent(popupContent);
  
    // Marker üzerine ikinci popup'ı ekle ve aç
    marker.bindPopup(detailPopup).openPopup();
    this.selectedMarker.emit({ ...markerData });


    componentRef.instance.cancelButtonClicked.subscribe(() => {
      // İlk popup'ı kapat
      marker.closePopup(); // Argümansız çağrı!
      // this.openPopup(marker);
    });

    componentRef.instance.updateButtonClicked.subscribe(() => {
      // İlk popup'ı kapat
      marker.closePopup(); // Argümansız çağrı!
      // this.openPopup(marker);
    });
    
  }

  private openDetailHumidityPopup(marker: L.Marker, markerData: MarkerData): void {
    this.selectedMarker.emit({ ...markerData });
    // İkinci popup için içerik oluştur
    const popupContent = document.createElement('div');
    const factory = this.resolver.resolveComponentFactory(HumidityPopupComponent);
    const componentRef = this.container.createComponent(factory);
  
    // Angular bileşenini popup içerik alanına ekle
    popupContent.appendChild(componentRef.location.nativeElement);
  
    // Marker'a özel bilgileri popup'a geçir
    componentRef.instance.markerData = markerData;  // Bu satır ile markerData'yı component'e geçiriyoruz

    // İkinci popup'ı manuel olarak oluştur ve göster
    const detailPopup = L.popup()
      .setLatLng(marker.getLatLng())
      .setContent(popupContent);
  
    // Marker üzerine ikinci popup'ı ekle ve aç
    marker.bindPopup(detailPopup).openPopup();

    componentRef.instance.cancelButtonClicked.subscribe(() => {
      // İlk popup'ı kapat
      marker.closePopup(); // Argümansız çağrı!
      // this.openPopup(marker);
    });

    componentRef.instance.updateButtonClicked.subscribe(() => {
      // İlk popup'ı kapat
      marker.closePopup(); // Argümansız çağrı!
      // this.openPopup(marker);
    });
  }

   
 
}
