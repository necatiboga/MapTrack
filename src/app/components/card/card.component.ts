import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MarkerData } from '../../service/marker.service';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @ViewChild('myButton') myButton!: ElementRef<HTMLButtonElement>;

  @Input() marker: MarkerData | undefined;
  @Input() selectedMarker: MarkerData | undefined;
  @Output() deviceClicked = new EventEmitter<any>();

  isSelected: boolean = false;


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log("CardComponent: ", changes);

    if (changes['selectedMarker']) {
      console.log("selectedMarkerss:", this.selectedMarker)
      if (this.marker && this.selectedMarker && this.marker.id === this.selectedMarker.id) {
        this.isSelected = true;
        this.myButton.nativeElement.focus();
      } else if (this.marker) {
        this.isSelected = false;
        //this.myButton.nativeElement.blur();
      }
    }
  }

  onClickDevice() {
    this.deviceClicked.emit(this.marker);
  }
}
