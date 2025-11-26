import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Heroes } from './heroes';

describe('Heroes', () => {
  let component: Heroes;
  let fixture: ComponentFixture<Heroes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Heroes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Heroes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
