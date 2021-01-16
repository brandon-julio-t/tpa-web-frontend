import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuspendRequestComponent } from './unsuspend-request.component';

describe('UnsuspendRequestComponent', () => {
  let component: UnsuspendRequestComponent;
  let fixture: ComponentFixture<UnsuspendRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuspendRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuspendRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
