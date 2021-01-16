import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGamesCreateComponent } from './admin-games-create.component';

describe('AdminGamesCreateComponent', () => {
  let component: AdminGamesCreateComponent;
  let fixture: ComponentFixture<AdminGamesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGamesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGamesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
