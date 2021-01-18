import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromosUpdateComponent } from './admin-promos-update.component';

describe('AdminPromosUpdateComponent', () => {
  let component: AdminPromosUpdateComponent;
  let fixture: ComponentFixture<AdminPromosUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPromosUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPromosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
