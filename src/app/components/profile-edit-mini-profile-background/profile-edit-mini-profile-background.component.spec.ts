import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditMiniProfileBackgroundComponent } from './profile-edit-mini-profile-background.component';

describe('ProfileEditMiniProfileBackgroundComponent', () => {
  let component: ProfileEditMiniProfileBackgroundComponent;
  let fixture: ComponentFixture<ProfileEditMiniProfileBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditMiniProfileBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditMiniProfileBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
