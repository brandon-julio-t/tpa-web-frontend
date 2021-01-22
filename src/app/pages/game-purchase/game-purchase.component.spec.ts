import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePurchaseComponent } from './game-purchase.component';

describe('GamePurchaseComponent', () => {
  let component: GamePurchaseComponent;
  let fixture: ComponentFixture<GamePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamePurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
