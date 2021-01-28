import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategoriesContainerComponent } from './home-categories-container.component';

describe('HomeCategoriesComponent', () => {
  let component: HomeCategoriesContainerComponent;
  let fixture: ComponentFixture<HomeCategoriesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeCategoriesContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCategoriesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
