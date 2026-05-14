import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningDetail } from './screening-detail';

describe('ScreeningDetail', () => {
  let component: ScreeningDetail;
  let fixture: ComponentFixture<ScreeningDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreeningDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreeningDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
