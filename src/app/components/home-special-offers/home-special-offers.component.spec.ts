import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSpecialOffersComponent } from './home-special-offers.component';

describe('HomeSpecialOffersComponent', () => {
  let component: HomeSpecialOffersComponent;
  let fixture: ComponentFixture<HomeSpecialOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSpecialOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSpecialOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
