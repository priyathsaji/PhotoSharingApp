import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardDialogComponent } from './post-card-dialog.component';

describe('PostCardDialogComponent', () => {
  let component: PostCardDialogComponent;
  let fixture: ComponentFixture<PostCardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
