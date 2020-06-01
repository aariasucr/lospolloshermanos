import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFrameComponent } from './post-frame.component';

describe('PostFrameComponent', () => {
  let component: PostFrameComponent;
  let fixture: ComponentFixture<PostFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
