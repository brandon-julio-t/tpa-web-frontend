import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGamesUpdateComponent } from './admin-games-update.component';

describe('AdminGamesUpdateComponent', () => {
  let component: AdminGamesUpdateComponent;
  let fixture: ComponentFixture<AdminGamesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGamesUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGamesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
