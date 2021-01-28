import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsAllComponent } from './friends-all.component';

describe('FriendsAllComponent', () => {
  let component: FriendsAllComponent;
  let fixture: ComponentFixture<FriendsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
