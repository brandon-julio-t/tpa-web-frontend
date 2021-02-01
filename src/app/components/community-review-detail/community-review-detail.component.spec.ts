import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityReviewDetailComponent } from './community-review-detail.component';

describe('CommunityReviewDetailComponent', () => {
  let component: CommunityReviewDetailComponent;
  let fixture: ComponentFixture<CommunityReviewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityReviewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityReviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
