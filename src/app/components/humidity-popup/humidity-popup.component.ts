import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MarkerData, MarkerService } from '../../service/marker.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-humidity-popup',
  imports: [FormsModule],
  templateUrl: './humidity-popup.component.html',
  styleUrl: './humidity-popup.component.scss'
})
export class HumidityPopupComponent {
  @Input() markerData: MarkerData | undefined;
  @Output() cancelButtonClicked = new EventEmitter<void>();
  @Output() updateButtonClicked = new EventEmitter<void>();
  humidity: number = 0;

  constructor(private markerService: MarkerService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.markerData) {
      this.humidity = this.markerData.humidity;
    }
  }

  onCancelClick(): void {
    this.cancelButtonClicked.emit();
  }

  onUpdateClick(): void {
    console.log("Humidity:  ", this.humidity)
    // this.markerData!.humidity = this.humidity;
    // this.markerData!.humidity = this.humidity;
    let markerData: MarkerData = {
      id: this.markerData!.id,
      name: this.markerData!.name,
      latitude: this.markerData!.latitude,
      longitude: this.markerData!.longitude,
      temperature: this.markerData!.temperature,
      humidity: this.humidity
    };

    console.log("şet Marketata: , markerData  ", markerData)
    this.markerService.updateMarker(markerData!);

    this.updateButtonClicked.emit();
  }
}
