import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityImageAndVideoDetailComponent } from './community-image-and-video-detail.component';

describe('CommunityImageAndVideoDetailComponent', () => {
  let component: CommunityImageAndVideoDetailComponent;
  let fixture: ComponentFixture<CommunityImageAndVideoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityImageAndVideoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityImageAndVideoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
