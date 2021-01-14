import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPhaseOneComponent } from './register-phase-one.component';

describe('RegisterInitialComponent', () => {
  let component: RegisterPhaseOneComponent;
  let fixture: ComponentFixture<RegisterPhaseOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPhaseOneComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPhaseOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
