import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPhaseTwoComponent } from './register-phase-two.component';

describe('RegisterOtpComponent', () => {
  let component: RegisterPhaseTwoComponent;
  let fixture: ComponentFixture<RegisterPhaseTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPhaseTwoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPhaseTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
