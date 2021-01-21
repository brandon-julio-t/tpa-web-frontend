import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeaturedAndRecommendedComponent } from './home-featured-and-recommended.component';

describe('HomeFeaturedAndRecommendedComponent', () => {
  let component: HomeFeaturedAndRecommendedComponent;
  let fixture: ComponentFixture<HomeFeaturedAndRecommendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFeaturedAndRecommendedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFeaturedAndRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
