import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogScreening } from './dialog-screening';

describe('DialogScreening', () => {
  let component: DialogScreening;
  let fixture: ComponentFixture<DialogScreening>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogScreening],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogScreening);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
