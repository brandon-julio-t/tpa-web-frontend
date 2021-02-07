import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsShopComponent } from './points-shop.component';

describe('StoreComponent', () => {
  let component: PointsShopComponent;
  let fixture: ComponentFixture<PointsShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PointsShopComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
