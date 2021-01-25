import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailReviewsComponent } from './game-detail-reviews.component';

describe('GameDetailReviewsComponent', () => {
  let component: GameDetailReviewsComponent;
  let fixture: ComponentFixture<GameDetailReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
