import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchStreamComponent } from './watch-stream.component';

describe('WatchStreamComponent', () => {
  let component: WatchStreamComponent;
  let fixture: ComponentFixture<WatchStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
