import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMovieInfo } from './dialog-movie-info';

describe('DialogMovieInfo', () => {
  let component: DialogMovieInfo;
  let fixture: ComponentFixture<DialogMovieInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogMovieInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogMovieInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
