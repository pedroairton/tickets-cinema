import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRooms } from './dialog-rooms';

describe('DialogRooms', () => {
  let component: DialogRooms;
  let fixture: ComponentFixture<DialogRooms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRooms],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogRooms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
