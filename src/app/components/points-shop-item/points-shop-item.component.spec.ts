import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsShopItemComponent } from './points-shop-item.component';

describe('PointsShopItemComponent', () => {
  let component: PointsShopItemComponent;
  let fixture: ComponentFixture<PointsShopItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsShopItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsShopItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
