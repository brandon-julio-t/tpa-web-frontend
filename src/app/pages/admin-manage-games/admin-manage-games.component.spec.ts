import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageGamesComponent } from './admin-manage-games.component';

describe('AdminManageGameComponent', () => {
  let component: AdminManageGamesComponent;
  let fixture: ComponentFixture<AdminManageGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminManageGamesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
