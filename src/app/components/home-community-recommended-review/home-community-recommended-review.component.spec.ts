import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCommunityRecommendedReviewComponent } from './home-community-recommended-review.component';

describe('HomeCommunityRecommendedReviewComponent', () => {
  let component: HomeCommunityRecommendedReviewComponent;
  let fixture: ComponentFixture<HomeCommunityRecommendedReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCommunityRecommendedReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCommunityRecommendedReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
