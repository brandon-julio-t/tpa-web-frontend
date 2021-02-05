import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityDiscussionDetailComponent } from './community-discussion-detail.component';

describe('CommunityDiscussionDetailComponent', () => {
  let component: CommunityDiscussionDetailComponent;
  let fixture: ComponentFixture<CommunityDiscussionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityDiscussionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityDiscussionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
