import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditAvatarBorderComponent } from './profile-edit-avatar-border.component';

describe('ProfileEditAvatarFrameComponent', () => {
  let component: ProfileEditAvatarBorderComponent;
  let fixture: ComponentFixture<ProfileEditAvatarBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditAvatarBorderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditAvatarBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
