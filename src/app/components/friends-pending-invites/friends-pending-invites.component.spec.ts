import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPendingInvitesComponent } from './friends-pending-invites.component';

describe('FriendsPendingInvitesComponent', () => {
  let component: FriendsPendingInvitesComponent;
  let fixture: ComponentFixture<FriendsPendingInvitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsPendingInvitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsPendingInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
