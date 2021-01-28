import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategoriesContentComponent } from './home-categories-content.component';

describe('HomeCategoriesNewAndTrendingComponent', () => {
  let component: HomeCategoriesContentComponent;
  let fixture: ComponentFixture<HomeCategoriesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeCategoriesContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCategoriesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
