import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageUnsuspendRequestsComponent } from './admin-manage-unsuspend-requests.component';

describe('AdminManageUnsuspendRequestsComponent', () => {
  let component: AdminManageUnsuspendRequestsComponent;
  let fixture: ComponentFixture<AdminManageUnsuspendRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageUnsuspendRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageUnsuspendRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
