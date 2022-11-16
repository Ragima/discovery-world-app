import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostpaginComponent } from './postpagin.component';

describe('PostpaginComponent', () => {
  let component: PostpaginComponent;
  let fixture: ComponentFixture<PostpaginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostpaginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostpaginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
