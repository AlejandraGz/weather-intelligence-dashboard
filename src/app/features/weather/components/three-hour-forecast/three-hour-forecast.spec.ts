import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeHourForecast } from './three-hour-forecast';

describe('ThreeHourForecast', () => {
  let component: ThreeHourForecast;
  let fixture: ComponentFixture<ThreeHourForecast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeHourForecast],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreeHourForecast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
