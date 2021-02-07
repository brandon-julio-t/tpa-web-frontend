import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditFeaturedBadgeComponent } from './profile-edit-featured-badge.component';

describe('ProfileEditFeaturedBadgeComponent', () => {
  let component: ProfileEditFeaturedBadgeComponent;
  let fixture: ComponentFixture<ProfileEditFeaturedBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditFeaturedBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditFeaturedBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
