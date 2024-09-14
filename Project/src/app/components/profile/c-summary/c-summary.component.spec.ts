import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSummaryComponent } from './c-summary.component';

describe('CSummaryComponent', () => {
  let component: CSummaryComponent;
  let fixture: ComponentFixture<CSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
