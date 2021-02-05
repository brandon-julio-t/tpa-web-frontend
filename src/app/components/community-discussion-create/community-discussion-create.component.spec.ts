import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityDiscussionCreateComponent } from './community-discussion-create.component';

describe('CommunityDiscussionCreateComponent', () => {
  let component: CommunityDiscussionCreateComponent;
  let fixture: ComponentFixture<CommunityDiscussionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityDiscussionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityDiscussionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
