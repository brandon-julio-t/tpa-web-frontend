import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagePromoAndDiscountComponent } from './admin-manage-promo-and-discount.component';

describe('AdminManagePromoAndDiscountComponent', () => {
  let component: AdminManagePromoAndDiscountComponent;
  let fixture: ComponentFixture<AdminManagePromoAndDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManagePromoAndDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagePromoAndDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
