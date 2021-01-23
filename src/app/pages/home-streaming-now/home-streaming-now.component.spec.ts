import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStreamingNowComponent } from './home-streaming-now.component';

describe('HomeStreamingNowComponent', () => {
  let component: HomeStreamingNowComponent;
  let fixture: ComponentFixture<HomeStreamingNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeStreamingNowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStreamingNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
