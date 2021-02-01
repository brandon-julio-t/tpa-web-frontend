import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityImagesAndVideosComponent } from './community-images-and-videos.component';

describe('CommunityImagesAndVideosComponent', () => {
  let component: CommunityImagesAndVideosComponent;
  let fixture: ComponentFixture<CommunityImagesAndVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityImagesAndVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityImagesAndVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
