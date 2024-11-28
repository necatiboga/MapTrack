import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarkerData, MarkerService } from '../../service/marker.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-temperature-popup',
  imports: [FormsModule],
  templateUrl: './temperature-popup.component.html',
  styleUrl: './temperature-popup.component.scss'
})
export class TemperaturePopupComponent {
  @Input() markerData: MarkerData | undefined;
  @Output() cancelButtonClicked = new EventEmitter<void>();
  @Output() updateButtonClicked = new EventEmitter<void>();
  temperature: number = 0;

  constructor(private markerService: MarkerService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.markerData) {
      this.temperature = this.markerData.temperature;
    }
  }

  onCancelClick(): void {
    this.cancelButtonClicked.emit();
  }

  onUpdateClick(): void {
    console.log("temperature:  ", this.temperature)
    // this.markerData!.temperature = this.temperature;
    // this.markerData!.temperature = this.temperature;
    let markerData: MarkerData = {
      id: this.markerData!.id,
      name: this.markerData!.name,
      latitude: this.markerData!.latitude,
      longitude: this.markerData!.longitude,
      humidity: this.markerData!.humidity,
      temperature: this.temperature
    };

    console.log("şet Marketata: , markerData  ", markerData)
    this.markerService.updateMarker(markerData!);

    this.updateButtonClicked.emit();
  }
}
