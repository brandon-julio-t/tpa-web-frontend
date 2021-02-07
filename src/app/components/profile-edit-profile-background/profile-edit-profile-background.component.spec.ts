import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditProfileBackgroundComponent } from './profile-edit-profile-background.component';

describe('ProfileEditProfileBackgroundComponent', () => {
  let component: ProfileEditProfileBackgroundComponent;
  let fixture: ComponentFixture<ProfileEditProfileBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditProfileBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditProfileBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
