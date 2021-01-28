import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategoriesSpecialsComponent } from './home-categories-specials.component';

describe('HomeCategoriesSpecialsComponent', () => {
  let component: HomeCategoriesSpecialsComponent;
  let fixture: ComponentFixture<HomeCategoriesSpecialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCategoriesSpecialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCategoriesSpecialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
