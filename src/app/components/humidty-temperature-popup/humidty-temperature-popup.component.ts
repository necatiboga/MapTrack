import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarkerData } from '../../service/marker.service';

@Component({
  selector: 'app-humidty-temperature-popup',
  imports: [],
  templateUrl: './humidty-temperature-popup.component.html',
  styleUrl: './humidty-temperature-popup.component.scss'
})
export class HumidtyTemperaturePopupComponent {
  @Output() temperatureSettingsClicked = new EventEmitter<void>();
  @Output() humiditySettingsClicked = new EventEmitter<void>();
  @Input() markerData: MarkerData | undefined;

  onTemperatureClick(): void {
    this.temperatureSettingsClicked.emit();
  }

  onHumidityClick(): void {
    this.humiditySettingsClicked.emit();
  }
}
