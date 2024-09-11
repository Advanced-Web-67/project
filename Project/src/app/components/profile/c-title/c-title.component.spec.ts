import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTitleComponent } from './c-title.component';

describe('CTitleComponent', () => {
  let component: CTitleComponent;
  let fixture: ComponentFixture<CTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
