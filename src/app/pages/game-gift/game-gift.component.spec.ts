import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameGiftComponent } from './game-gift.component';

describe('GameGiftComponent', () => {
  let component: GameGiftComponent;
  let fixture: ComponentFixture<GameGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameGiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
