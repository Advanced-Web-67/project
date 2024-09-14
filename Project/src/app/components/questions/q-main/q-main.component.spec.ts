import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QMainComponent } from './q-main.component';

describe('QMainComponent', () => {
  let component: QMainComponent;
  let fixture: ComponentFixture<QMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
