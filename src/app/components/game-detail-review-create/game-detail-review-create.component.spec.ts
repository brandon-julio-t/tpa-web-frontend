import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailReviewCreateComponent } from './game-detail-review-create.component';

describe('GameDetailReviewCreateComponent', () => {
  let component: GameDetailReviewCreateComponent;
  let fixture: ComponentFixture<GameDetailReviewCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailReviewCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailReviewCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
