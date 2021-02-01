import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityImageAndVideoCreateComponent } from './community-image-and-video-create.component';

describe('CommunityImagesAndVideosCreateComponent', () => {
  let component: CommunityImageAndVideoCreateComponent;
  let fixture: ComponentFixture<CommunityImageAndVideoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityImageAndVideoCreateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityImageAndVideoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
