import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityPopupComponent } from './humidity-popup.component';

describe('HumidityPopupComponent', () => {
  let component: HumidityPopupComponent;
  let fixture: ComponentFixture<HumidityPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumidityPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumidityPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
