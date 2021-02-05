import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityDiscussionsComponent } from './community-discussions.component';

describe('CommunityDiscussionsComponent', () => {
  let component: CommunityDiscussionsComponent;
  let fixture: ComponentFixture<CommunityDiscussionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityDiscussionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityDiscussionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
