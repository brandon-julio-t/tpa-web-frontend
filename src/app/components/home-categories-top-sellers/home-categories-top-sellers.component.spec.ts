import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategoriesTopSellersComponent } from './home-categories-top-sellers.component';

describe('HomeCategoriesTopSellersComponent', () => {
  let component: HomeCategoriesTopSellersComponent;
  let fixture: ComponentFixture<HomeCategoriesTopSellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCategoriesTopSellersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCategoriesTopSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
