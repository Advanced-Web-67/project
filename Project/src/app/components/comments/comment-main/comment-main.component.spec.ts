import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentMainComponent } from './comment-main.component';

describe('CommentMainComponent', () => {
  let component: CommentMainComponent;
  let fixture: ComponentFixture<CommentMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
