import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsCreateComponent } from './questions-create.component';

describe('QuestionsCreateComponent', () => {
  let component: QuestionsCreateComponent;
  let fixture: ComponentFixture<QuestionsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
