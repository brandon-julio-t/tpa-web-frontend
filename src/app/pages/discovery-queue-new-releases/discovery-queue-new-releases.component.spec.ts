import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryQueueNewReleasesComponent } from './discovery-queue-new-releases.component';

describe('DiscoveryQueueNewReleasesComponent', () => {
  let component: DiscoveryQueueNewReleasesComponent;
  let fixture: ComponentFixture<DiscoveryQueueNewReleasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoveryQueueNewReleasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveryQueueNewReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
