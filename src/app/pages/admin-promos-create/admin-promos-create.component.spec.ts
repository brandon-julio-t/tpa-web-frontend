import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromosCreateComponent } from './admin-promos-create.component';

describe('AdminPromosCreateComponent', () => {
  let component: AdminPromosCreateComponent;
  let fixture: ComponentFixture<AdminPromosCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPromosCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPromosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
