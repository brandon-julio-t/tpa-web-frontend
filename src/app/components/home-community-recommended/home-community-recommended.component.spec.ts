import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCommunityRecommendedComponent } from './home-community-recommended.component';

describe('HomeCommunityRecommendedComponent', () => {
  let component: HomeCommunityRecommendedComponent;
  let fixture: ComponentFixture<HomeCommunityRecommendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCommunityRecommendedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCommunityRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
